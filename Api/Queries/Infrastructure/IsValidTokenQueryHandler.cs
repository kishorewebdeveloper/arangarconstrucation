using System.Threading;
using System.Threading.Tasks;
using Common.Enum;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Queries.Infrastructure
{
    public class IsValidTokenQueryHandler : IRequestHandler<IsValidTokenQuery, bool>
    {
        private readonly DatabaseContext context;

        public IsValidTokenQueryHandler(DatabaseContext context)
        {
            this.context = context;
        }
        
        public async Task<bool> Handle(IsValidTokenQuery request, CancellationToken cancellationToken)
        {
            if (request.UserId == 0)
                return false;

            var user = await context.User
                    .AsNoTracking()
                    .FirstOrDefaultAsync(i => i.Id == request.UserId && i.Status == StatusType.Enabled, cancellationToken);

            return user != null;
        }
    }
}