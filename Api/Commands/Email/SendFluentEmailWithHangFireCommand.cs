using MediatR;

namespace Commands.Email
{
    public class SendFluentEmailWithHangFireCommand : IRequest
    {
        public string FullName { get; set; }
        public string EmailAddress { get; set; }
        public string CurrentDate { get; set; }
        public string Url { get; set; }

        public SendFluentEmailWithHangFireCommand()
        {
            
        }
    }
}
