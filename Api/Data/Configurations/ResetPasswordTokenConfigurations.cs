using Data.Configurations.CoreConfigurations;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{

    public class ResetPasswordTokenConfigurations : BaseEntityTypeConfiguration<ResetPasswordToken>
    {
        public override void Configure(EntityTypeBuilder<ResetPasswordToken> entityTypeBuilder)
        {
            ConfigureResetPasswordTokenSchema(entityTypeBuilder);
            base.Configure(entityTypeBuilder);
        }

        private static void ConfigureResetPasswordTokenSchema(EntityTypeBuilder<ResetPasswordToken> builder)
        {
            builder.Property(e => e.EmailAddress)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Token)
                .HasMaxLength(50)
                .IsRequired();

        }
    }
}
