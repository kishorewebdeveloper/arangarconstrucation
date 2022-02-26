using System;
using Caching.Abstractions;
using Microsoft.Extensions.Caching.Distributed;

namespace Caching.Extensions
{
    public static class ExpirationOptionsExtensions
    {
        public static DistributedCacheEntryOptions GetCacheEntryOptions(this ExpirationOptions source)
        {
            return new DistributedCacheEntryOptions
            {
                AbsoluteExpiration = source.AbsoluteExpiration,
                AbsoluteExpirationRelativeToNow = source.AbsoluteExpirationRelativeToNow ?? TimeSpan.FromSeconds(60),
                SlidingExpiration = source.SlidingExpiration
            };
        }
    }
}
