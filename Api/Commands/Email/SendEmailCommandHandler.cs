using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using Common;
using MediatR;
using Microsoft.Extensions.Options;


namespace Commands.Email
{
    public class SendEmailCommandHandler : IRequestHandler<SendEmailCommand, Result>
    {
        private readonly SmtpSettings smtpSettings;

        public SendEmailCommandHandler(IOptionsSnapshot<SmtpSettings> smtpSettings)
        {
            this.smtpSettings = smtpSettings.Value;
        }

        public async Task<Result> Handle(SendEmailCommand command, CancellationToken token)
        {
            using var smtp = new SmtpClient(smtpSettings.Server)
            {
                Port = smtpSettings.Port,
                EnableSsl = smtpSettings.EnableSsl,
                Credentials = new NetworkCredential(smtpSettings.Username, smtpSettings.Password),
                UseDefaultCredentials = smtpSettings.UseDefaultCredentials
            };
            await smtp.SendMailAsync(command.MailMessage, token);
            return new SuccessResult();
        }
    }
}
