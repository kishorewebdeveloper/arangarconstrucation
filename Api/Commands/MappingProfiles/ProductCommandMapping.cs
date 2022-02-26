using AutoMapper;
using Commands.Project;

namespace Commands.MappingProfiles
{
    public class ProductCommandMapping : Profile
    {
        public ProductCommandMapping()
        {
            CreateMap<SaveProjectCommand, Domain.Entities.Project>();
        }
    }
}
