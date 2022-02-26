using System.Collections.Generic;
using MediatR;

namespace Commands.RedisCache
{
    public class InValidateRedisWithHangFireCommand : IRequest
    {
        public List<string> Keys { get; set; }
    }
}
