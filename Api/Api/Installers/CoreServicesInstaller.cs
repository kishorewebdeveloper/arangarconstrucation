using System.Text.Json;
using Api.Infrastructure;
using Ardalis.GuardClauses;
using Commands.Login;
using Common;
using Common.Interface;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
 

namespace Api.Installers
{
    public class CoreServicesInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            Guard.Against.Null(services, nameof(services));

            services.AddCors();
            services.AddControllers();
       
            services.AddSingleton(configuration);
            services.AddLogging();

            AddSerializerSettings(services);
            AddMvcWithOptions(services);
            ConfigureCommonServices(services);

            AddAppSettings(services, configuration);
            AddEmailSettings(services, configuration);
            AddOauthSettings(services, configuration);
            AddRedisSettings(services, configuration);
            AddHangfireSettings(services, configuration);
        }

        private static void AddMvcWithOptions(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                //By the type  
                options.Filters.Add(typeof(TokenValidationAttribute));
                options.Filters.Add(typeof(CommandHydratorAttribute));
            }).AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<LoginCommandValidator>());
        }

        private static void AddSerializerSettings(IServiceCollection services)
        {
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
        }

        private static void ConfigureCommonServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<ILoggedOnUserProvider, LoggedOnUser>();
        }

        private static void AddRedisSettings(IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<RedisSettings>()
                .Bind(configuration.GetSection(RedisSettings.Key))
                .ValidateDataAnnotations();
        }

        private static void AddHangfireSettings(IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<HangfireSettings>()
                .Bind(configuration.GetSection(HangfireSettings.Key))
                .ValidateDataAnnotations();
        }

        private static void AddAppSettings(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AppSettings>(configuration.GetSection(AppSettings.Key));
        }

        private static void AddEmailSettings(IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<SmtpSettings>()
                .Bind(configuration.GetSection(SmtpSettings.Key))
                .ValidateDataAnnotations();
        }


        private static void AddOauthSettings(IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<OauthSettings>()
             .Bind(configuration.GetSection(OauthSettings.Key))
             .ValidateDataAnnotations();
        }
    }
}
