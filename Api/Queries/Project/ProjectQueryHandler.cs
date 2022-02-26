using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.Project;

namespace Queries.Project
{
    public class ProjectQueryHandler : IRequestHandler<ProjectQuery, ProjectViewModel>
    {
        private readonly DatabaseContext context;
        private readonly IMapper mapper;

        public ProjectQueryHandler(DatabaseContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ProjectViewModel> Handle(ProjectQuery query, CancellationToken cancellationToken)
        {
            var data = await context.Project
                .AsNoTracking()
                .SingleOrDefaultAsync(i => i.Id == query.Id, cancellationToken);

            return mapper.Map<ProjectViewModel>(data);
        }
    }
}