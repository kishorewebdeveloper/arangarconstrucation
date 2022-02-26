using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Data.Extensions;
using Domain.CoreEntities;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() { }

        public DatabaseContext(DbContextOptions options)
            : base(options)
        {

        }

        public DbSet<CommandAudit> CommandAudit { get; set; }
        public DbSet<QueryAudit> QueryAudit { get; set; }
        public virtual DbSet<AuditTrail> AuditTrail { get; set; }

        public DbSet<User> User { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<ProjectImage> ProjectImage { get; set; }
      
        public DbSet<ResetPasswordToken> ResetPasswordToken { get; set; }

        public Task<int> SaveChangesAsync(string loggedOnUserId, CancellationToken cancellationToken)
        {
            this.AddAuditTrailLogs(loggedOnUserId);
            return base.SaveChangesAsync(cancellationToken);
        }

        public Task<int> SaveChangesAsync<T>(T commandMessage, CancellationToken cancellationToken) where T : Message
        {
            this.AddAuditTrailLogs(commandMessage.LoggedOnUserId.ToString(), commandMessage.MessageId);
            return base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
