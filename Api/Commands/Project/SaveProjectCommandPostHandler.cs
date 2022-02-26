using System.Threading;
using System.Threading.Tasks;
using Common;
using MediatR;
using MediatR.Pipeline;

namespace Commands.Project
{
    public class SaveProjectCommandPostHandler : IRequestPostProcessor<SaveProjectCommand, Result<long>>
    {
        private readonly IMediator mediator;

        public SaveProjectCommandPostHandler(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Process(SaveProjectCommand request, Result<long> response, CancellationToken cancellationToken)
        {
            if (response.IsSuccess)
                await mediator.Publish(new ProjectCacheInvalidationNotification(response.Value), cancellationToken);
        }
    }
}