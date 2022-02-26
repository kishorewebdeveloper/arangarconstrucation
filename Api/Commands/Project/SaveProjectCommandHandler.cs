using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Common;
using Data;
using Data.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Project
{
    public class SaveProjectCommandHandler : IRequestHandler<SaveProjectCommand, Result<long>>
    {
        private readonly DatabaseContext context;
        private readonly IMapper mapper;

        public SaveProjectCommandHandler(DatabaseContext context, IMapper mapper, IMediator mediatr)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<long>> Handle(SaveProjectCommand command, CancellationToken cancellationToken)
        {
            var entity = new Domain.Entities.Project();
            if (command.Id > 0)
            {
                entity = await context.Project.SingleOrDefaultAsync(i => i.Id == command.Id, cancellationToken);

                if (entity == null)
                    return new FailureResult<long>($"Could not find {nameof(Domain.Entities.Project)} information");

            }

            mapper.Map(command, entity);
       
            entity.PopulateMetaData(command.LoggedOnUserId.ToString());

            if (command.Id == 0)
                await context.Project.AddAsync(entity, cancellationToken);

            await context.SaveChangesAsync(command, cancellationToken);
            return new SuccessResult<long>(entity.Id);
        }
    }
}