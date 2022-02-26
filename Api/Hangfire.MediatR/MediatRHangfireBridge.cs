using System.ComponentModel;
using System.Threading.Tasks;
using MediatR;

namespace Hangfire.MediatR
{
    public class MediatRHangfireBridge
    {
        private readonly IMediator mediator;
      
        public MediatRHangfireBridge(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task Send<T>(T command) where T : class
        {
            await mediator.Send(command);
        }

        [DisplayName("{0}")]
        public async Task Send<T>(string jobName, T command) where T : class
        {
            await mediator.Send(command);
        }
    }
}
