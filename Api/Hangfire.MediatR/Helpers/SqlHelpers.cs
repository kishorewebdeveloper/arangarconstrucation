using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Hangfire.MediatR.Helpers
{
    internal static class SqlHelpers
    {
        private static async Task CreateDatabaseAsync(IConfigurationRoot configuration, string hangfireConnectionString)
        {
            var connectionStringBuilder = new SqlConnectionStringBuilder(hangfireConnectionString);
            var hangfireDatabaseName = connectionStringBuilder.InitialCatalog;


            var defaultConnectionBuilder = new SqlConnectionStringBuilder(configuration.GetConnectionString("ConnectionString"))
            {
                InitialCatalog = "master"
            };

            await using var connection = new SqlConnection(defaultConnectionBuilder.ToString());
            connection.Open();

            const string commandText = @"IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'{0}') create database [{0}];";
            await using var command = new SqlCommand(string.Format(commandText, hangfireDatabaseName), connection);
            await command.ExecuteNonQueryAsync();
            await connection.CloseAsync();
        }
    }
}
