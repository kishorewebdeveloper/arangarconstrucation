using Common.Helpers;
using FluentValidation;

namespace Commands.ForgotPassword
{
    public class SendPasswordResetEmailCommandValidator : AbstractValidator<SendPasswordResetEmailCommand>
    {
        public SendPasswordResetEmailCommandValidator()
        {
            RuleFor(cmd => cmd.EmailAddress).NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required");
        }
    }
}
