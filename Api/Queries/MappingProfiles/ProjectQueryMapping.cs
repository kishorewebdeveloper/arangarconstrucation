using AutoMapper;
using ViewModel.Project;

namespace Queries.MappingProfiles
{
    public class ProjectQueryMapping : Profile
    {
        public ProjectQueryMapping()
        {
            CreateMap<Domain.Entities.Project, ProjectsViewModel>();

            CreateMap<Domain.Entities.Project, ProjectViewModel>();

            CreateMap<Domain.Entities.Project, ProjectsWithImagesViewModel>();
        }
    }
}
