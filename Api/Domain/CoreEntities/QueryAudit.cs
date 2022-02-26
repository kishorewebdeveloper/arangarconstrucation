using System;

namespace Domain.CoreEntities
{
    public partial class QueryAudit
    {
        public long Id { get; set; }
        public long LoggedOnUserId { get; set; }
        public DateTime UtcTimeStamp { get; set; } = DateTime.UtcNow;
        public Guid MessageId { get; set; } = Guid.NewGuid();
        public bool IsSuccess { get; set; }
        public string ExceptionMessage { get; set; }
        public string Type { get; set; }
        public string Data { get; set; }
        public string IpAddress { get; set; }
        public int Milliseconds { get; set; }
    }
}
