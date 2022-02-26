using MediatR;
using Microsoft.Extensions.Caching.Distributed;

namespace Commands.RedisCache
{
    public class SetRedisWithHangFireCommand : IRequest
    {
        public string Key { get; set; }
        public dynamic Value { get; set; }
        public DistributedCacheEntryOptions Options { get; set; }
    }

}
