using FluentValidation;

namespace Commands.ResetPassword
{
    public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
    {
        public ResetPasswordCommandValidator()
        {
            RuleFor(cmd => cmd.TokenGuid)
                .NotEmpty()
                .WithMessage("Token Guid is required");
          
            RuleFor(cmd => cmd.EmailAddress)
                .NotEmpty()
                .WithMessage("Email Address is required");

            RuleFor(cmd => cmd.Password)
                .NotEmpty()
                .WithMessage("Password is required");

            RuleFor(cmd => cmd.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Confirm Password is required");

            RuleFor(x => x.ConfirmPassword)
                .Equal(x => x.Password)
                .WithMessage("Passwords do not match");
        }
    }
}
