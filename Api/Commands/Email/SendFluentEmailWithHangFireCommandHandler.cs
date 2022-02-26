using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Commands.Email.Templates;
using FluentEmail.Core;
using MediatR;
using Attachment = FluentEmail.Core.Models.Attachment;


namespace Commands.Email
{
    public class SendFluentEmailWithHangFireCommandHandler : IRequestHandler<SendFluentEmailWithHangFireCommand>
    {
        private readonly EmailTemplates emailTemplates;
        private readonly IFluentEmail mailer;

        public SendFluentEmailWithHangFireCommandHandler(EmailTemplates emailTemplates, IFluentEmail mailer)
        {
            this.emailTemplates = emailTemplates;
            this.mailer = mailer;
        }

        public async Task<Unit> Handle(SendFluentEmailWithHangFireCommand command, CancellationToken token)
        {
            var attachment = GetLogoAsInlineAttachment();
            var sourceFileEmbeddedSource = emailTemplates.GetPasswordResetLinkEmailEmbeddedSource();
            var email = mailer
                .To(command.EmailAddress)
                .Subject("Forgot password")
                .Attach(attachment)
                .UsingTemplateFromEmbedded(sourceFileEmbeddedSource, command, Assembly.GetExecutingAssembly());

            await email.SendAsync();
            return await Task.FromResult(Unit.Value);
        }

        private Attachment GetLogoAsInlineAttachment()
        {
            var attachment = new Attachment
            {
                IsInline = true,
                Data = emailTemplates.GetLogoAsStream(),
                ContentType = "image/png",
                Filename = "logo.png",
                ContentId = "logo"
            };
            return attachment;
        }
    }
}
