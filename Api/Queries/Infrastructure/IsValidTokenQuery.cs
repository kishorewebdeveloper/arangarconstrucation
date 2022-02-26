using MediatR;

namespace Queries.Infrastructure
{
    public class IsValidTokenQuery : IRequest<bool>
    {
        public long UserId { get; set; }

        public IsValidTokenQuery(long userId)
        {
            UserId = userId;
        }
    }
}