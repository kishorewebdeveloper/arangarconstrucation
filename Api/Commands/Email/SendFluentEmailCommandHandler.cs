using System;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Commands.Email.Templates;
using Common;
using FluentEmail.Core;
using MediatR;
using Attachment = FluentEmail.Core.Models.Attachment;


namespace Commands.Email
{
    public class SendFluentEmailCommandHandler : IRequestHandler<SendFluentEmailCommand, Result>
    {
        private readonly EmailTemplates emailTemplates;
        private readonly IFluentEmail mailer;
        
        public SendFluentEmailCommandHandler(EmailTemplates emailTemplates, IFluentEmail mailer)
        {
            this.emailTemplates = emailTemplates;
            this.mailer = mailer;
        }

        public async Task<Result> Handle(SendFluentEmailCommand command, CancellationToken token)
        {
            var attachment = GetLogoAsInlineAttachment();
            var sourceFileEmbeddedSource = emailTemplates.GetPasswordResetLinkEmailEmbeddedSource();
            var email = mailer
                .To(command.EmailAddress)
                .Subject("Forgot password")
                .Attach(attachment)
                .UsingTemplateFromEmbedded(sourceFileEmbeddedSource, command, Assembly.GetExecutingAssembly());

            try
            {
                var response = await email.SendAsync();

                if (response.Successful)
                    return new SuccessResult();

                return new FailureResult(response.ErrorMessages);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new FailureResult(ex.Message);
            }
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
