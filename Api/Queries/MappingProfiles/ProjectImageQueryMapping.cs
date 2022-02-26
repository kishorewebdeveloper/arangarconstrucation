using AutoMapper;
using ViewModel.ProjectImage;

namespace Queries.MappingProfiles
{
    public class ProjectImageQueryMapping : Profile
    {
        public ProjectImageQueryMapping()
        {
            CreateMap<Domain.Entities.ProjectImage, ProjectImagesViewModel>();
        }
    }
}
