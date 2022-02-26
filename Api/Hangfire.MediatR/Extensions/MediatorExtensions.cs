using Common;
using MediatR;

namespace Hangfire.MediatR.Extensions
{
    public static class MediatorExtensions
    {
        public static void Enqueue(this IMediator mediator, string jobName)
        {
            BackgroundJob.Enqueue<MediatRHangfireBridge>(m => m.Send(jobName));
        }

        public static void Enqueue(this IMediator mediator, string jobName, IRequest request)
        {
            BackgroundJob.Enqueue<MediatRHangfireBridge>(m => m.Send(jobName, request));
        }

        public static void Enqueue(this IMediator mediator, string jobName, Message request)
        {
            BackgroundJob.Enqueue<MediatRHangfireBridge>(m => m.Send(jobName, request));
        }
    }
}