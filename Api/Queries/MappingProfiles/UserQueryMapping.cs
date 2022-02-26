using AutoMapper;
using ViewModel.User;

namespace Queries.MappingProfiles
{
    public class UserQueryMapping : Profile
    {
        public UserQueryMapping()
        {
            CreateMap<Domain.Entities.User, UsersViewModel>();

            CreateMap<Domain.Entities.User, UserViewModel>();
        }
    }
}
