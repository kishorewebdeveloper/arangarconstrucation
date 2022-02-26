using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Api.Extensions;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Commands.Email.Templates;
using Commands.Login;
using Common;
using Data;
using Data.Extensions;
using ElmahCore.Mvc;
using Hangfire;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Oauth;
using Oauth.Extensions;
using Serilog;

namespace Api
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }
        public ILifetimeScope ApplicationContainer { get; private set; }

        public Startup(IHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
                .AddJsonFile($"appsettings.overrides.json", true, true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
                builder.AddUserSecrets<Startup>();

            Configuration = builder.Build();
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.RegisterServicesInAssembly(Configuration);
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterType<EmailTemplates>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            ApplicationContainer = app.ApplicationServices.GetAutofacRoot();

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var database = serviceScope.ServiceProvider.GetService<DatabaseContext>();
                if (database is not null && !database.AllMigrationsApplied())
                {
                    database.Database.Migrate();
                    database.EnsureSeeded();
                }
            }

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(_ => true) // allow any origin
                .AllowCredentials());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSerilogRequestLogging();
            app.UseElmah();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sri Arangar");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            ConfigureAuth(app);

            app.UseAuthorization();

            var hangfireSettings = app.ApplicationServices.GetRequiredService<IOptionsSnapshot<HangfireSettings>>().Value;
            if (hangfireSettings.IsEnabled)
                app.UseHangfireDashboard("/jobs");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

           
        }

        protected void ConfigureAuth(IApplicationBuilder app)
        {
            var oauthSettings = app.ApplicationServices.GetRequiredService<IOptionsSnapshot<OauthSettings>>().Value;
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(oauthSettings.SecretKey));
            app.UseSimpleTokenProvider(new TokenProviderOptions
            {
                Path = oauthSettings.TokenEndpoint,
                Audience = oauthSettings.AudienceId,
                Issuer = oauthSettings.Issuer,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                Expiration = TimeSpan.FromDays(Convert.ToInt64(oauthSettings.AccessTokenExpirationInDays)),
                IdentityResolver = GetIdentity
            });
            app.UseAuthentication();
        }

        private async Task<Tuple<ClaimsIdentity, Result>> GetIdentity(string username, string password)
        {
            var mediator = ApplicationContainer.Resolve<IMediator>();
            var result = await mediator.Send(new LoginCommand
            {
                UserName = username,
                Password = password
            });

            var claim = new ClaimsIdentity(result.Value);
            return new Tuple<ClaimsIdentity, Result>(claim, result);
        }

    }
}
