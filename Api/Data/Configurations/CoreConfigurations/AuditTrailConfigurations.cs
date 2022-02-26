using Domain.CoreEntities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations.CoreConfigurations
{
    public class AuditTrailConfigurations : IEntityTypeConfiguration<AuditTrail>
    {
        public void Configure(EntityTypeBuilder<AuditTrail> builder)
        {
            ConfigureAuditTrailSchema(builder);
        }

        private static void ConfigureAuditTrailSchema(EntityTypeBuilder<AuditTrail> builder)
        {
            builder.Property(e => e.UserId)
                .HasMaxLength(10);

            builder.Property(e => e.TableName)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
