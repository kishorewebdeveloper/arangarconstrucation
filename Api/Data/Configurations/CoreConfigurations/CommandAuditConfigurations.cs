using Domain.CoreEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations.CoreConfigurations
{
    public class CommandAuditConfigurations : IEntityTypeConfiguration<CommandAudit>
    {
        public void Configure(EntityTypeBuilder<CommandAudit> builder)
        {
            ConfigureCommandAuditSchema(builder);
        }

        private static void ConfigureCommandAuditSchema(EntityTypeBuilder<CommandAudit> builder)
        {
            builder.Property(e => e.Type)
                   .HasMaxLength(100);

            builder.Property(e => e.IpAddress)
                .HasMaxLength(200);
        }
    }
}
