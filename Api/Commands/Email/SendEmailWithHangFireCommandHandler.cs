using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Commands.Email
{
    public class SendEmailWithHangFireCommandHandler : IRequestHandler<SendEmailWithHangFireCommand>
    {
        public async Task<Unit> Handle(SendEmailWithHangFireCommand command, CancellationToken token)
        {
            using var smtp = new SmtpClient(command.SmtpServer)
            {
                Port = command.SmtpPort,
                EnableSsl = command.SmtpEnableSsl,
                Credentials = new NetworkCredential(command.SmtpUsername, command.SmtpPassword),
                UseDefaultCredentials = false
            };

            var mailMessage = new MailMessage(command.SmtpFrom, command.ToEmailAddress)
            {
                Subject = "Event Invitation",
                Body = command.Body,
                IsBodyHtml = true
            };

            await smtp.SendMailAsync(mailMessage, token);
            return await Task.FromResult(Unit.Value);
        }
    }
}
