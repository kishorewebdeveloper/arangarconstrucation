using System.ComponentModel.DataAnnotations;

namespace Common
{
    public class SmtpSettings
    {
        public const string Key = "SmtpSettings";

        [Required]
        public string Server { get; set; }

        [Required]
        public int Port { get; set; }

        [Required]
        public bool EnableSsl { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string From { get; set; }

        [Required]
        public bool UseDefaultCredentials { get; set; }
    }
}
