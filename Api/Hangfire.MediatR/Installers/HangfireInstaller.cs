using System;
using System.Threading.Tasks;
using System.Transactions;
using Common.Interface;
using Extensions;
using Hangfire.MediatR.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Hangfire.MySql;
using Ardalis.GuardClauses;
using Hangfire.MediatR.Helpers;

namespace Hangfire.MediatR.Installers
{
    public class HangfireInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            Guard.Against.NullOrWhiteSpace(configuration["HangfireSettings:IsEnabled"], "HangfireSettings:IsEnabled");

            var isHangfireEnabled = configuration["HangfireSettings:IsEnabled"].ToBoolean();
            var hangfireConnectionString = configuration["HangfireSettings:ConnectionString"];

            switch (isHangfireEnabled)
            {
                case true:
                    Guard.Against.NullOrWhiteSpace(hangfireConnectionString, nameof(hangfireConnectionString));
                    break;
                case false:
                    return;
            }

            Task.Run(() => MySqlHelpers.CreateDatabaseAsync(configuration, hangfireConnectionString));

            var mySqlStorageOptions = new MySqlStorageOptions
            {
                TransactionIsolationLevel = IsolationLevel.ReadCommitted,
                PrepareSchemaIfNecessary = true,
                TransactionTimeout = TimeSpan.FromMinutes(2)
            };

            var storage = new MySqlStorage(hangfireConnectionString, mySqlStorageOptions);

            services.AddHangfire(globalConfiguration =>
            {
                globalConfiguration.UseMaxArgumentSizeToRender(int.MaxValue);
                globalConfiguration.UseStorage(storage);
                globalConfiguration.UseMediatR();
            });

            services.AddHangfireServer();
        }
    }
}
