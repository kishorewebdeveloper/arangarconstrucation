using Common;
using Common.Interface;

namespace Commands.ProjectImage
{
    public class DeleteProjectImageCommand : Command<Result<bool>>
    {
        public DeleteProjectImageCommand(long id, ILoggedOnUserProvider user)
        {
            SetUser(user);
            Id = id;
        }

        public long Id { get; set; }
    }
}
