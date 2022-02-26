using System;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Common.Enum;
using Data;
using Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.ResetPassword
{
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, Result>
    {

        private readonly DatabaseContext context;

        public ResetPasswordCommandHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<Result> Handle(ResetPasswordCommand command, CancellationToken cancellationToken)
        {
            var data = await context.ResetPasswordToken
                .FirstOrDefaultAsync(i => i.EmailAddress.ToUpper() == command.EmailAddress.ToUpper()
                                          && i.IsConsumed == false && i.Token == command.TokenGuid
                                          && DateTime.UtcNow <= i.ExpirationTs, cancellationToken);

            if (data == null)
                return new FailureResult<string>($"Cannot find password reset link for Email Address {command.EmailAddress}");


            var user = await context.User
                .FirstOrDefaultAsync(u => u.EmailAddress.ToUpper() == command.EmailAddress.ToUpper()
                                          && u.IsEmailVerified
                                          && u.IsAccountLocked == false
                                          && u.Status == StatusType.Enabled, cancellationToken);

            if (user == null)
                return new FailureResult<string>($"Cannot find user with Email Address{command.EmailAddress}");

            await UpdatePassword(command, cancellationToken);

            await UpdatePasswordRequestToken(command, cancellationToken);

            return new SuccessResult();
        }

        private async Task UpdatePassword(ResetPasswordCommand command, CancellationToken cancellationToken)
        {
            var user = await context.User
                .FirstOrDefaultAsync(u => u.EmailAddress.ToUpper() == command.EmailAddress.ToUpper(), cancellationToken);

            if (user != null)
            {
                var (hashedPassword, passwordKey) = command.Password.ToPasswordHmacSha512Hash();
                user.Password = hashedPassword;
                user.PasswordKey = passwordKey;
                await context.SaveChangesAsync(cancellationToken);
            }
        }

        private async Task UpdatePasswordRequestToken(ResetPasswordCommand command, CancellationToken cancellationToken)
        {
            var entity = await context.ResetPasswordToken
                .FirstOrDefaultAsync(i => i.Token == command.TokenGuid && i.IsConsumed == false, cancellationToken);

            if (entity != null)
            {
                entity.IsConsumed = true;
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}