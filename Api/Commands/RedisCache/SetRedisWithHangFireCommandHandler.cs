using System.Threading;
using System.Threading.Tasks;
using Caching.Extensions;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace Commands.RedisCache
{
    public class SetRedisWithHangFireCommandHandler : IRequestHandler<SetRedisWithHangFireCommand>
    {
        private readonly IDistributedCache cache;

        public SetRedisWithHangFireCommandHandler(IDistributedCache cache)
        {
            this.cache = cache;
        }

        public async Task<Unit> Handle(SetRedisWithHangFireCommand command, CancellationToken cancellationToken)
        {
            await DistributedCacheRefTypeExtensions.SetAsync(cache, command.Key, command.Value, command.Options, cancellationToken);
            return await Task.FromResult(Unit.Value);
        }
    }
}
