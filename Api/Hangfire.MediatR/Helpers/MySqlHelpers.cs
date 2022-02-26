using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace Hangfire.MediatR.Helpers
{
    internal static class MySqlHelpers
    {
        internal static async Task CreateDatabaseAsync(IConfigurationRoot configuration, string hangfireConnectionString)
        {
            var connectionStringBuilder = new MySqlConnectionStringBuilder(hangfireConnectionString);
            var hangfireDatabaseName = connectionStringBuilder.Database;

            var defaultConnectionBuilder = new MySqlConnectionStringBuilder(configuration.GetConnectionString("ConnectionString"))
            {
                Database = "information_schema"
            };

            await using var connection = new MySqlConnection(defaultConnectionBuilder.ToString());
            connection.Open();

            var commandText = $@"CREATE DATABASE IF NOT EXISTS {hangfireDatabaseName};";
            await using var command = new MySqlCommand(commandText, connection);
            await command.ExecuteNonQueryAsync();
            await connection.CloseAsync();
        }
    }
}
