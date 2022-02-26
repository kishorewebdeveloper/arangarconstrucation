using System;
using System.Net;
using System.Net.Mail;
using Common.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Commands.Installers
{
    public class FluentEmailInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            var server = configuration["SmtpSettings:Server"];
            var port = Convert.ToInt32(configuration["SmtpSettings:Port"]);
            var fromEmailAddress = configuration["SmtpSettings:Username"];
            var password = configuration["SmtpSettings:Password"];
            var from = configuration["SmtpSettings:From"];

            services.AddFluentEmail(fromEmailAddress, from)
                .AddRazorRenderer()
                .AddSmtpSender(new SmtpClient(server)
                {
                    Port = port,
                    EnableSsl = true,
                    Credentials = new NetworkCredential(fromEmailAddress, password),
                    UseDefaultCredentials = false
                });
        }
    }
}
