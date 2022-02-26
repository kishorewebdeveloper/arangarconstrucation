using System;

namespace ViewModel.Audit
{
    public class QueryAuditsViewModel
    {
        public long Id { get; set; }
        public long LoggedOnUserId { get; set; }
        public DateTime CreatedTime { get; set; }
        public Guid MessageId { get; set; }
        public bool IsSuccess { get; set; }
        public string ExceptionMessage { get; set; }
        public string Type { get; set; }
        public string Data { get; set; }
        public string IpAddress { get; set; }
        public int Milliseconds { get; set; }
    }
}
