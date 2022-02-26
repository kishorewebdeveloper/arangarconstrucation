using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.ProjectImage;

namespace Queries.ProjectImageQuery
{
    public class ProjectImagesQueryHandler : IRequestHandler<ProjectImagesQuery, IEnumerable<ProjectImagesViewModel>>
    {
        private readonly DatabaseContext context;
        private readonly IMapper mapper;

        public ProjectImagesQueryHandler(DatabaseContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ProjectImagesViewModel>> Handle(ProjectImagesQuery query, CancellationToken cancellationToken)
        {
            var data = await context.ProjectImage
                .AsNoTracking()
                .Where(i => i.ProjectId == query.ProjectId)
                .ToListAsync(cancellationToken);

            return data.Select(mapper.Map<ProjectImagesViewModel>).ToList();
        }
    }
}