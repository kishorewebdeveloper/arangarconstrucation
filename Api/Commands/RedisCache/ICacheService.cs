using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Commands.RedisCache
{
    public interface ICacheService
    {
        Task InValidateCacheAsync(List<string> keys, CancellationToken cancellationToken);
    }
}