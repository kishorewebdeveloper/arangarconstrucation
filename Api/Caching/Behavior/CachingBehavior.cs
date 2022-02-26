using System.Threading;
using System.Threading.Tasks;
using Ardalis.GuardClauses;
using Caching.Abstractions;
using Caching.Extensions;
using Commands.RedisCache;
using Common;
using Hangfire.MediatR.Extensions;
using MediatR;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using Serilog;

namespace Caching.Behavior
{
    public class CachingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private readonly IDistributedCache cache;
        private readonly ILogger logger;
        private readonly RedisSettings redisSettings;
        private readonly IMediator mediator;

        public CachingBehavior(IDistributedCache cache, ILogger logger, IOptionsSnapshot<RedisSettings> redisSettings, IMediator mediator)
        {
            this.cache = cache;
            this.logger = logger;
            this.redisSettings = redisSettings.Value;
            this.mediator = mediator;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (request is not ICacheable cacheable)
                return await next();

            Guard.Against.NullOrEmpty(cacheable.Key, nameof(cacheable.Key));

            var (exist, returnValue) = await cache.TryGetAsync<TResponse>(cacheable.Key, cancellationToken);

            if (exist)
            {
                cacheable.IsFromCache = true;
                logger.Information($"Key '{{{cacheable.Key}}}' found. Returning from cache object {{{typeof(TRequest).Name}}}");
                return returnValue;
            }

            var value = await next();

            cacheable.IsFromCache = false;

            if (!redisSettings.IsEnabled)
            {
                await cache.SetAsync(cacheable.Key, value, cacheable.Options.GetCacheEntryOptions(), cancellationToken);
                logger.Information($"Insert to cache object {{{typeof(TRequest).Name}}} with key {{{cacheable.Key}}}");
                return value;
            }

            await AddDataToRedisCache(cacheable, value, cancellationToken);
            return value;
        }

        private async Task AddDataToRedisCache(ICacheable cacheable, TResponse value, CancellationToken cancellationToken)
        {
            await Task.Run(() => mediator.Enqueue($"Set Data - {cacheable.Key}", new SetRedisWithHangFireCommand
            {
                Key = cacheable.Key,
                Value = value,
                Options = cacheable.Options.GetCacheEntryOptions(),

            }), cancellationToken);
        }
    }
}
