using Data.Configurations.CoreConfigurations;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class ProjectConfigurations : BaseEntityTypeConfiguration<Project>
    {
        public override void Configure(EntityTypeBuilder<Project> entityTypeBuilder)
        {
            ConfigureProductSchema(entityTypeBuilder);
            base.Configure(entityTypeBuilder);
        }

        private static void ConfigureProductSchema(EntityTypeBuilder<Project> builder)
        {
            builder.Property(e => e.ProjectName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.Description)
                .HasMaxLength(500);

            builder.Property(e => e.Address1)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(e => e.Address2)
                .HasMaxLength(300);

            builder.Property(e => e.City)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.State)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(e => e.PinCode)
                .IsRequired();

            builder.Property(e => e.LandMark)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(e => e.BHK);

            builder.Property(e => e.Features)
                .HasMaxLength(1000);

            builder.Property(e => e.Lat)
                .HasMaxLength(50);

            builder.Property(e => e.Lng)
                .HasMaxLength(50);

            builder.Property(e => e.ServiceType)
                .IsRequired();

            builder.HasMany(p => p.ProjectImages)
                .WithOne(e => e.Project)
                .HasForeignKey(i => i.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
