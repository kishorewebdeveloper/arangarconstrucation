using Commands.RedisCache;
using Common.Interface;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Commands.Installers
{
    public class CommandInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            var assemblies = new[]
            {
                typeof(Command<>).Assembly
            };

            services.AddMediatR(assemblies);

            ConfigureDependencyInjectionForCommandPipelineBehaviors(services);
            services.AddScoped<ICacheService, CacheService>();
        }

        private static void ConfigureDependencyInjectionForCommandPipelineBehaviors(IServiceCollection services)
        {
            //Pipelines are executed in the order in which they are registered:

            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(FluentValidationPipelineBehaviour<,>));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(CommandAuditPipelineBehaviour<,>));
        }
    }
}
