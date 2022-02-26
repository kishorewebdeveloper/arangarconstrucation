using System.Threading;
using System.Threading.Tasks;
 
using Common;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Users
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Result<long>>
    {
        private readonly DatabaseContext context;

        public DeleteUserCommandHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<Result<long>> Handle(DeleteUserCommand command, CancellationToken token)
        {
            var data = await context.User
                .SingleOrDefaultAsync(i => i.Id == command.Id, token);

            if (data == null)
                return new FailureResult<long>($"Could not find {nameof(Domain.Entities.User)}");

            if (data.IsSystemUser)
                return new FailureResult<long>($"You can't delete this user {data.EmailAddress}. Please contact administrator");

            context.User.Remove(data);
            await context.SaveChangesAsync(token);
            return new SuccessResult<long>(data.Id);
        }
    }

     
}
