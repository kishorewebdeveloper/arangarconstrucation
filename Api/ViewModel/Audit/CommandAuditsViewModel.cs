using System;

namespace ViewModel.Audit
{
    public class CommandAuditsViewModel
    {
        public long Id { get; set; }
        public long LoggedOnUserId { get; set; }
        public DateTime CreatedTime { get; set; }
        public bool IsSuccess { get; set; }
        public string ExceptionMessage { get; set; }
        public string Type { get; set; }
        public string IpAddress { get; set; }
        public int Milliseconds { get; set; }
    }
}
