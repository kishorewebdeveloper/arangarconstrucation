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
    public class ProjectsWithImagesQueryHandler : IRequestHandler<ProjectsWithImagesQuery, IEnumerable<ProjectsWithImagesViewModel>>
    {
        private readonly IMapper mapper;
        private readonly DatabaseContext context;

        public ProjectsWithImagesQueryHandler(IMapper mapper, DatabaseContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<ProjectsWithImagesViewModel>> Handle(ProjectsWithImagesQuery request, CancellationToken cancellationToken)
        {
            var data = await context.Project
                .Include(i => i.ProjectImages)
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return data.Select(mapper.Map<ProjectsWithImagesViewModel>).ToList();
        }
    }
}