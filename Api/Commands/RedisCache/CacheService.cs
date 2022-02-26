using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Caching.Extensions;
using Common;
using Extensions;
using Hangfire.MediatR.Extensions;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;

namespace Commands.RedisCache
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache cache;
        private readonly IMediator mediator;
        private readonly RedisSettings redisSettings;

        public CacheService(IDistributedCache cache, IMediator mediator, IOptionsSnapshot<RedisSettings> redisSettings)
        {
            this.cache = cache;
            this.mediator = mediator;
            this.redisSettings = redisSettings.Value;
        }

        public async Task InValidateCacheAsync(List<string> keys, CancellationToken cancellationToken)
        {
            if (keys.Any())
            {
                if (redisSettings.IsEnabled)
                {
                    await Task.Run(() => mediator.Enqueue($"Deleting Data - {keys.JoinWithComma()}", new InValidateRedisWithHangFireCommand
                    {
                        Keys = keys
                    }), cancellationToken);
                    return;
                }
                await cache.RemoveKeyAsync(keys, cancellationToken);
            }
        }
    }
}
