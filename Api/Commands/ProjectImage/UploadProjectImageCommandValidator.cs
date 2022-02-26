using System.IO;
using System.Linq;
using Extensions;
using FluentValidation;
using ViewModel;

namespace Commands.ProjectImage
{
    public class UploadProjectImageCommandValidator : AbstractValidator<UploadProjectImageCommand>
    {
        //10 MB
        private const int MaxContentLength = 1024 * 1024 * 10;

        private readonly string[] allowedFileExtensions =
        {
            ".jpg", ".jpeg", ".png"
        };

        public UploadProjectImageCommandValidator()
        {
            RuleFor(a => a).Must((a, _) => FormDataValidation(a))
                .OverridePropertyName("FileViewModel")
                .WithMessage("Form data is missing");

            When(a => a.FormData != null, () =>
            {
                RuleFor(a => a.FormData.SingleOrDefault(b => b.Key == "ProjectId").Value)
                    .NotEmpty()
                    .WithMessage("Project Id is required");
            });

            When(a => a.FileViewModel != null, () =>
            {
                RuleFor(a => a.FileViewModel.Data).NotEmpty().WithMessage("File data is required");
                RuleFor(a => a.FileViewModel.Name).NotEmpty().WithMessage("File name is required");
                RuleFor(a => a.FileViewModel.ContentType).NotEmpty().WithMessage("File content type is required");

                RuleFor(a => a).Must((a, _) => IsValidFile(a.FileViewModel))
                    .OverridePropertyName("FileType")
                    .WithMessage("Invalid file format, allowed type are : " + allowedFileExtensions.JoinWith("<br/>"));

                RuleFor(a => a).Must((a, _) => IsValidFileSize(a.FileViewModel))
                    .OverridePropertyName("FileSize")
                    .WithMessage("File is too large, maximum allowed size is : 10 MB");
            });
        }

        private static bool IsValidFileSize(FileViewModel fileViewModel)
        {
            return fileViewModel.Length < MaxContentLength;
        }

        private bool IsValidFile(FileViewModel fileViewModel)
        {
            return allowedFileExtensions.Contains(Path.GetExtension(fileViewModel.Name?.ToLower()));
        }

        private static bool FormDataValidation(UploadProjectImageCommand command)
        {
            return !(command.FormData == null || command.FormData.Count == 0);
        }
    }
}
