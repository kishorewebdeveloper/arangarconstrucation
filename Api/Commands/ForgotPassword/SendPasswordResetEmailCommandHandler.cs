using System;
using System.Threading;
using System.Threading.Tasks;
using Commands.Email;
using Common;
using Common.Enum;
using Data;
using Data.Extensions;
using Domain.Entities;
using Hangfire.MediatR.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ViewModel.ForgotPassword;

namespace Commands.ForgotPassword
{
    public class SendPasswordResetEmailCommandHandler : IRequestHandler<SendPasswordResetEmailCommand, Result<Guid>>
    {
        private readonly DatabaseContext context;
        private readonly IMediator mediator;
        private readonly AppSettings appSettings;

        public SendPasswordResetEmailCommandHandler(DatabaseContext context, IMediator mediator, IOptionsSnapshot<AppSettings> appSettings)
        {
            this.context = context;
            this.mediator = mediator;
            this.appSettings = appSettings.Value;
        }

        public async Task<Result<Guid>> Handle(SendPasswordResetEmailCommand command, CancellationToken cancellationToken)
        {
            var user = await context.User
                .FirstOrDefaultAsync(u => u.EmailAddress.ToUpper() == command.EmailAddress.ToUpper()
                                          && u.IsEmailVerified
                                          && u.IsAccountLocked == false
                                          && u.Status == StatusType.Enabled, cancellationToken);

            if (user == null)
                return new SuccessResult<Guid>(Guid.NewGuid());

            var tokenGuid = Guid.NewGuid();

            var model = new ForgotPasswordViewModel
            {
                FullName = user.FullName,
                EmailAddress = user.EmailAddress,
                CurrentDate = DateTime.Now.ToString("ddd, MMM d, yyyy"),
                Url = $"{appSettings.ClientUrl}{appSettings.ResetPasswordUrl}{tokenGuid}",

            };
            await UpdatePasswordRequestToken(command, model, tokenGuid, cancellationToken);
            await SendEmail(command, model, cancellationToken);
            return new SuccessResult<Guid>(tokenGuid);
        }

        private async Task UpdatePasswordRequestToken(SendPasswordResetEmailCommand command, ForgotPasswordViewModel model, Guid tokenGuid, CancellationToken cancellationToken)
        {
            var entity = new ResetPasswordToken
            {
                EmailAddress = model.EmailAddress,
                Token = tokenGuid,
                ExpirationTs = DateTime.UtcNow.AddDays(2)
            };

            entity.PopulateMetaData(command.LoggedOnUserId.ToString());
            await context.ResetPasswordToken.AddAsync(entity, cancellationToken);
            await context.SaveChangesAsync(command, cancellationToken);
        }


        private async Task SendEmail(SendPasswordResetEmailCommand command, ForgotPasswordViewModel model, CancellationToken cancellationToken)
        {
            await Task.Run(() => mediator.Enqueue($"Forgot Password - {model.EmailAddress}", new SendFluentEmailWithHangFireCommand
            {
                FullName = model.FullName,
                Url = model.FullName,
                EmailAddress = model.EmailAddress
            }), cancellationToken);

            //await mediator.Send(new SendFluentEmailCommand(command)
            //{

            //});
        }
    }
}
