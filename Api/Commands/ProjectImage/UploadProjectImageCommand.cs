using System.Collections.Generic;
using Common;
using Common.Interface;
using ViewModel;

namespace Commands.ProjectImage
{
    public class UploadProjectImageCommand :  Command<Result<long>>
    {
        public UploadProjectImageCommand() { }

        public UploadProjectImageCommand(ILoggedOnUserProvider user)
        {
            SetUser(user);
        }

        public List<KeyValuePair<string, string>> FormData { get; set; }
        public FileViewModel FileViewModel { get; set; }
    }
}
