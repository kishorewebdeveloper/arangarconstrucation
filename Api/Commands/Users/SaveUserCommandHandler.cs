using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Commands.RedisCache;
using Common;
using Common.Constants;
using Data;
using Data.Extensions;
using Extensions;
using MediatR;
using MediatR.Pipeline;
using Microsoft.EntityFrameworkCore;

namespace Commands.Users
{
    public class SaveUserCommandHandler : IRequestHandler<SaveUserCommand, Result<long>>
    {
        private readonly DatabaseContext context;
        private readonly IMapper mapper;

        public SaveUserCommandHandler(DatabaseContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<long>> Handle(SaveUserCommand command, CancellationToken cancellationToken)
        {
            var entity = new Domain.Entities.User();
            if (command.Id > 0)
            {
                entity = await context.User.SingleOrDefaultAsync(i => i.Id == command.Id, cancellationToken);

                if (entity == null)
                    return new FailureResult<long>($"Could not find {nameof(Domain.Entities.User)} information");
            }

            mapper.Map(command, entity);
            var (hashedPassword, passwordKey) = command.Password.ToPasswordHmacSha512Hash();
            entity.Password = hashedPassword;
            entity.PasswordKey = passwordKey;
            entity.IsEmailVerified = true;

            entity.PopulateMetaData(command.LoggedOnUserId.ToString());

            if (command.Id == 0)
                await context.User.AddAsync(entity, cancellationToken);

            await context.SaveChangesAsync(command, cancellationToken);
            return new SuccessResult<long>(entity.Id);
        }
    }


    public class SaveUserCommandPostHandler : IRequestPostProcessor<SaveUserCommand, Result<long>>
    {
        private readonly ICacheService cacheService;

        public SaveUserCommandPostHandler(ICacheService cacheService)
        {
            this.cacheService = cacheService;
        }

        public async Task Process(SaveUserCommand request, Result<long> response, CancellationToken cancellationToken)
        {
            if (response.IsSuccess)
            {
                var keys = new List<string>
                {
                    ApiRouteConstants.User.GetRoute,
                    ApiRouteConstants.User.GetByIdRoute.Replace("{id}", response.Value.ToString())
                };

                await cacheService.InValidateCacheAsync(keys, cancellationToken);
            }
        }
    }
}