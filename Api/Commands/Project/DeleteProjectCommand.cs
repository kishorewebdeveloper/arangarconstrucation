using Common;
using Common.Interface;

namespace Commands.Project
{
    public class DeleteProjectCommand : Command<Result<bool>>
    {
        public DeleteProjectCommand(long id, ILoggedOnUserProvider user)
        {
            SetUser(user);
            Id = id;
        }

        public long Id { get; set; }
    }
}
