using Common;
using Common.Interface;

namespace Commands.Email
{
    public class SendFluentEmailCommand : Command<Result>
    {
        public string FullName { get; set; }
        public string EmailAddress { get; set; }
        public string CurrentDate { get; set; }
        public string Url { get; set; }

        public SendFluentEmailCommand()
        {
            
        }

        public SendFluentEmailCommand(Message parentMsg)
        {
            MessageId = parentMsg.MessageId;
        }

        public SendFluentEmailCommand(Message parentMsg, ILoggedOnUserProvider user)
        {
            MessageId = parentMsg.MessageId;
            SetUser(user);
        }
    }
}
