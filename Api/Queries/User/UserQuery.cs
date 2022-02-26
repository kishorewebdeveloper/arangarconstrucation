using ViewModel.User;

namespace Queries.User
{
    public class UserQuery : Query<UserViewModel>
    {
        public long Id { get; set; }

        public UserQuery(long id)
        {
            Id = id;
        }
    }
}