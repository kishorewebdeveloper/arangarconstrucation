using Common.Helpers;
using FluentValidation;

namespace Commands.Project
{
    public class SaveProjectCommandValidator : AbstractValidator<SaveProjectCommand>
    {
        public SaveProjectCommandValidator()
        {
            RuleFor(cmd => cmd.ProjectName)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required")
                .Length(0, 50).WithMessage($"{FluentHelpers.PropertyName} should not exceed {FluentHelpers.MaxLength} characters");

            RuleFor(cmd => cmd.Title)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required")
                .Length(0, 50).WithMessage($"{FluentHelpers.PropertyName} should not exceed {FluentHelpers.MaxLength} characters");

            RuleFor(cmd => cmd.Description)
                .Length(0, 500).WithMessage($"{FluentHelpers.PropertyName} should not exceed {FluentHelpers.MaxLength} characters");

            RuleFor(cmd => cmd.Address1)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required")
                .Length(0, 300).WithMessage($"{FluentHelpers.PropertyName} should not exceed {FluentHelpers.MaxLength} characters");
            
            RuleFor(cmd => cmd.PinCode)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required");
            
            RuleFor(cmd => cmd.City)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required")
                .Length(0, 50).WithMessage($"{FluentHelpers.PropertyName} should not exceed {FluentHelpers.MaxLength} characters");
            
            RuleFor(cmd => cmd.State)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required")
                .Length(0, 50).WithMessage($"{FluentHelpers.PropertyName} should not exceed {FluentHelpers.MaxLength} characters");

            RuleFor(cmd => cmd.ServiceType)
                .NotEmpty().WithMessage($"{FluentHelpers.PropertyName} is required");

        }

    }
}
