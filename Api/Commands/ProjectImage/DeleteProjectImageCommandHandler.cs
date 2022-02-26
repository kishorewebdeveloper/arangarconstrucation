using System.Threading;
using System.Threading.Tasks;
using Common;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.ProjectImage
{
    public class DeleteProjectImageCommandHandler : IRequestHandler<DeleteProjectImageCommand, Result<bool>>
    {
        private readonly DatabaseContext context;

        public DeleteProjectImageCommandHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<Result<bool>> Handle(DeleteProjectImageCommand command, CancellationToken token)
        {
            var data = await context.ProjectImage
                .SingleOrDefaultAsync(i => i.Id == command.Id, token);

            if (data == null)
                return new FailureResult<bool>($"Could not find {nameof(Domain.Entities.ProjectImage)}");

            context.ProjectImage.Remove(data);
            await context.SaveChangesAsync(token);
            return new SuccessResult<bool>(true);
        }
    }
}
