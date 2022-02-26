using System;
using Common.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Data.Installers
{
    public class DatabaseInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            var connectionString = configuration.GetConnectionString("ConnectionString");
            var serverVersion = new MySqlServerVersion(new Version(10, 5, 10));

            services.AddDbContext<DatabaseContext>(options => options.UseMySql(connectionString, serverVersion));
        }
    }
}
