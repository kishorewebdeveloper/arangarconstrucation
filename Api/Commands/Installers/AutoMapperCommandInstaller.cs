using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using AutoMapper;
using Common.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Commands.Installers
{
    public class AutoMapperCommandInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));

            services.AddAutoMapper(GetAutoMapperProfilesFromCurrentAssembly().ToArray());
        }

        private static IEnumerable<Type> GetAutoMapperProfilesFromCurrentAssembly()
        {
            return Assembly.GetExecutingAssembly().ExportedTypes
                .Where(x => x.IsClass && !x.IsInterface && x.IsSubclassOf(typeof(Profile)))
                .Select(type => type);
        }
    }
}
