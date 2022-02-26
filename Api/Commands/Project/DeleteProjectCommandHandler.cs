using System.Threading;
using System.Threading.Tasks;
using Common;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Project
{
    public class DeleteProjectCommandHandler : IRequestHandler<DeleteProjectCommand, Result<bool>>
    {
        private readonly DatabaseContext context;

        public DeleteProjectCommandHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<Result<bool>> Handle(DeleteProjectCommand command, CancellationToken token)
        {
            var data = await context.Project
                .SingleOrDefaultAsync(i => i.Id == command.Id, token);

            if (data == null)
                return new FailureResult<bool>($"Could not find {nameof(Domain.Entities.Project)}");

            context.Project.Remove(data);
            await context.SaveChangesAsync(command, token);
            return new SuccessResult<bool>(true);
        }
    }
}
