﻿using System;
using System.Linq;
using System.Reflection;
using Common.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Common.Helpers
{
    public static class InstallersHelper
    {
        public static void RegisterServicesFromAssembly(this IServiceCollection services, Assembly assembly, IConfigurationRoot configuration)
        {
            var installers = assembly
                .ExportedTypes
                .Where(x => typeof(IInstaller).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                .Select(Activator.CreateInstance)
                .Cast<IInstaller>()
                .ToList();

            installers.ForEach(x => x.InstallServices(services, configuration));
        }
    }
}
