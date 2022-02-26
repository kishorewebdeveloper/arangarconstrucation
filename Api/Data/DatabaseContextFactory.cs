using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data
{
    public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
    {
        public DatabaseContextFactory()
        {
        }

        public DatabaseContext CreateDbContext(string[] args)
        {
            const string connectionString = "server=localhost;user=root;password=12345;database=ef";
            var serverVersion = new MySqlServerVersion(new Version(10, 5, 10));
            var builder = new DbContextOptionsBuilder<DatabaseContext>();
            builder.UseMySql(connectionString,  serverVersion);
            return new DatabaseContext(builder.Options);
        }
    }
}
