using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.Project;

namespace Queries.Project
{
    public class ProjectsQueryHandler : IRequestHandler<ProjectsQuery, IEnumerable<ProjectsViewModel>>
    {
        private readonly IMapper mapper;
        private readonly DatabaseContext context;

        public ProjectsQueryHandler(IMapper mapper, DatabaseContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<ProjectsViewModel>> Handle(ProjectsQuery request, CancellationToken cancellationToken)
        {
            var users = await context.Project
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return users.Select(mapper.Map<ProjectsViewModel>).ToList();
        }
    }
}