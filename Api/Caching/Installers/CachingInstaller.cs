using Ardalis.GuardClauses;
using Caching.Behavior;
using Common.Interface;
using Extensions;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Caching.Installers
{
    public class CachingInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            Guard.Against.NullOrWhiteSpace(configuration["RedisSettings:IsEnabled"], "RedisSettings:IsEnabled");

            var isRedisEnabled = configuration["RedisSettings:IsEnabled"].ToBoolean();
            var redisConnectionString = configuration["RedisSettings:ConnectionString"];

            if (isRedisEnabled)
                Guard.Against.NullOrWhiteSpace(redisConnectionString, nameof(redisConnectionString));

            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(CachingBehavior<,>));

            if (isRedisEnabled)
            {
                services.AddStackExchangeRedisCache(options =>
                {
                    options.Configuration = redisConnectionString;
                    options.InstanceName = $"{configuration["AppSettings:Environment"]}_";
                });
            }
            else
                services.AddDistributedMemoryCache();

        }
    }
}
