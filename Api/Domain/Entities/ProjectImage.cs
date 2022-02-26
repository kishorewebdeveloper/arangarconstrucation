using Domain.CoreEntities;

namespace Domain.Entities
{
    public partial class ProjectImage : BaseEntity
    {
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string Size { get; set; }
        public byte[] Data { get; set; }

        public Project Project { get; set; }
        public long ProjectId { get; set; }
    }
}
