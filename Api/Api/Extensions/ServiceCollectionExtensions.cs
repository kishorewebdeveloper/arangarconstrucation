using System.Reflection;
using Caching.Behavior;
using Commands;
using Common.Helpers;
using Data;
using Hangfire.MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Oauth;
using Queries;

namespace Api.Extensions
{
    internal static class ServiceCollectionExtensions
    {
        internal static void RegisterServicesInAssembly(this IServiceCollection services, IConfigurationRoot configuration)
        {
            services.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly(), configuration);
            services.RegisterServicesFromAssembly(typeof(MediatRHangfireBridge).Assembly, configuration);
            services.RegisterServicesFromAssembly(typeof(DatabaseContext).Assembly, configuration);
            services.RegisterServicesFromAssembly(typeof(TokenProviderMiddleware).Assembly, configuration);
            services.RegisterServicesFromAssembly(typeof(Query<>).Assembly, configuration);
            services.RegisterServicesFromAssembly(typeof(CachingBehavior<,>).Assembly, configuration);
            services.RegisterServicesFromAssembly(typeof(Command<>).Assembly, configuration);
        }
    }
}
