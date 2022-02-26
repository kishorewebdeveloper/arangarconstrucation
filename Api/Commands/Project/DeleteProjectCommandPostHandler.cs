using System.Threading;
using System.Threading.Tasks;
using Common;
using MediatR;
using MediatR.Pipeline;

namespace Commands.Project
{
    public class DeleteProjectCommandPostHandler : IRequestPostProcessor<DeleteProjectCommand, Result<bool>>
    {
        private readonly IMediator mediator;

        public DeleteProjectCommandPostHandler(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Process(DeleteProjectCommand command, Result<bool> response, CancellationToken cancellationToken)
        {
            if (response.IsSuccess)
                await mediator.Publish(new ProjectCacheInvalidationNotification(command.Id), cancellationToken);
        }
    }
}