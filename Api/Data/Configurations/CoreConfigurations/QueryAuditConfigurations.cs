using Domain.CoreEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations.CoreConfigurations
{
    public class QueryAuditConfigurations : IEntityTypeConfiguration<QueryAudit>
    {
        public void Configure(EntityTypeBuilder<QueryAudit> builder)
        {
            ConfigureQueryAuditSchema(builder);
        }

        private static void ConfigureQueryAuditSchema(EntityTypeBuilder<QueryAudit> builder)
        {
            builder.Property(e => e.Type)
                .HasMaxLength(100);

            builder.Property(e => e.IpAddress)
                .HasMaxLength(200);
        }
    }
}
