using AutoMapper;
using Commands.Users;

namespace Commands.MappingProfiles
{
    public class UserCommandMapping : Profile
    {
        public UserCommandMapping()
        {
            CreateMap<SaveUserCommand, Domain.Entities.User>()
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordKey, opt => opt.Ignore());
        }
    }
}
