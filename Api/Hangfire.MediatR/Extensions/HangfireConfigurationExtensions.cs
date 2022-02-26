namespace Hangfire.MediatR.Extensions
{
    internal static class HangfireConfigurationExtensions
    {
        internal static void UseMediatR(this IGlobalConfiguration configuration)
        {
            //var jsonSettings = new JsonSerializerSettings
            //{
            //    TypeNameHandling = TypeNameHandling.All
            //};
            //configuration.UseSerializerSettings(jsonSettings);
            configuration.UseRecommendedSerializerSettings(); 
        }
    }
}