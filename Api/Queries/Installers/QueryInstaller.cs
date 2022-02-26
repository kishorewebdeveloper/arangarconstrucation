using Common.Interface;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Queries.Installers
{
    public class QueryInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            var assemblies = new[]
            {
                typeof(Query<>).Assembly
            };

            services.AddMediatR(assemblies);
            ConfigureDependencyInjectionForQueryPipelineBehaviors(services);
        }

        private static void ConfigureDependencyInjectionForQueryPipelineBehaviors(IServiceCollection services)
        {
            //Pipelines are executed in the order in which they are registered:

            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(QueryAuditPipelineBehaviour<,>));
        }
    }
}
