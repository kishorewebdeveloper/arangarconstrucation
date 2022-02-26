using System.IO;
using System.Reflection;

namespace Commands.Email.Templates
{
    public class EmailTemplates
    {
        private const string EmailTemplateResourcePathRoot = "Commands.Email.Templates.";

        public string GetPasswordResetLinkEmailEmbeddedSource() => $"{EmailTemplateResourcePathRoot}ForgotPassword.ForgotPassword.html";

        public Stream GetLogoAsStream() => Assembly.GetExecutingAssembly().GetManifestResourceStream($"{EmailTemplateResourcePathRoot}Images.logo.png");
    }
}
