using Common.Interface;
using ElmahCore;
using ElmahCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Installers
{
    public class ElmahInstaller : IInstaller
    {
        private static string ElmahPath { get; set; }
        private static string ElmahLogFilePath { get; set; }

        public ElmahInstaller()
        {
            ElmahPath = @"logs";
            ElmahLogFilePath = "./logs";
        }

        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            services.AddElmah<XmlFileErrorLog>(options =>
            {
                //options.CheckPermissionAction = context => context.User.Identity.IsAuthenticated;
                options.Path = ElmahPath;
                options.LogPath = ElmahLogFilePath;
            });
        }
    }
}
