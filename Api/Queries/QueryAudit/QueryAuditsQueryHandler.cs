using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Common.Interface;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.Audit;

namespace Queries.QueryAudit
{
    public class QueryAuditsQueryHandler : IRequestHandler<QueryAuditsQuery, IEnumerable<QueryAuditsViewModel>>
    {
        private readonly IMapper mapper;
        private readonly DatabaseContext context;
        private readonly ILoggedOnUserProvider user;

        public QueryAuditsQueryHandler(IMapper mapper, DatabaseContext context, ILoggedOnUserProvider user)
        {
            this.mapper = mapper;
            this.context = context;
            this.user = user;
        }

        public async Task<IEnumerable<QueryAuditsViewModel>> Handle(QueryAuditsQuery request, CancellationToken cancellationToken)
        {
            var data = await context.QueryAudit
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            data.ForEach(a => a.ModifyDatesToDisplay(user));

            return data.Select(mapper.Map<QueryAuditsViewModel>).ToList();
        }
    }
}