using Data.Configurations.CoreConfigurations;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
  
    public class ProjectImageConfigurations : BaseEntityTypeConfiguration<ProjectImage>
    {
        public override void Configure(EntityTypeBuilder<ProjectImage> entityTypeBuilder)
        {
            ConfigureProductImageSchema(entityTypeBuilder);
            base.Configure(entityTypeBuilder);
        }

        private static void ConfigureProductImageSchema(EntityTypeBuilder<ProjectImage> builder)
        {
            builder.Property(e => e.ProjectId)
                .IsRequired();

            builder.Property(e => e.FileName)
                .IsRequired();

            builder.Property(e => e.ContentType)
                .IsRequired();

            builder.Property(e => e.Size)
                .IsRequired();

            builder.Property(e => e.Data)
                .IsRequired();
        }
    }
}
