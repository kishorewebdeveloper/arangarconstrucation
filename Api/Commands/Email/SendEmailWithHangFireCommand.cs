using MediatR;

namespace Commands.Email
{
    public class SendEmailWithHangFireCommand : IRequest
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public bool SmtpEnableSsl { get; set; }
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }

        //Mail Message Properties
        public string SmtpFrom { get; set; }
        public string ToEmailAddress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsBodyHtml { get; set; }
    }
}
