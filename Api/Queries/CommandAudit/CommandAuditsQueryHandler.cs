using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.Audit;

namespace Queries.CommandAudit
{
    public class CommandAuditsQueryHandler : IRequestHandler<CommandAuditsQuery, IEnumerable<CommandAuditsViewModel>>
    {
        private readonly IMapper mapper;
        private readonly DatabaseContext context;

        public CommandAuditsQueryHandler(IMapper mapper, DatabaseContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<CommandAuditsViewModel>> Handle(CommandAuditsQuery request, CancellationToken cancellationToken)
        {
            var data = await context.CommandAudit
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return data.Select(mapper.Map<CommandAuditsViewModel>).ToList();
        }
    }
}