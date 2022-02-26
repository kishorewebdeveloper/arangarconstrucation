using System.Threading;
using System.Threading.Tasks;
using Caching.Extensions;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace Commands.RedisCache
{
    public class InValidateRedisWithHangFireCommandHandler : IRequestHandler<InValidateRedisWithHangFireCommand>
    {
        private readonly IDistributedCache cache;

        public InValidateRedisWithHangFireCommandHandler(IDistributedCache cache)
        {
            this.cache = cache;
        }

        public async Task<Unit> Handle(InValidateRedisWithHangFireCommand command, CancellationToken cancellationToken)
        {
            await cache.RemoveKeyAsync(command.Keys, cancellationToken);
            return await Task.FromResult(Unit.Value);
        }
    }
}
