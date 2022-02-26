using Common;
using Common.Interface;

namespace Commands.Users
{
    public class DeleteUserCommand : Command<Result<long>>
    {
        public DeleteUserCommand(long id, ILoggedOnUserProvider user)
        {
            SetUser(user);
            Id = id;
        }

        public long Id { get; set; }
    }
}
