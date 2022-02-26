using System.ComponentModel.DataAnnotations;
using Common.CustomDataAnnotationsValidations;

namespace Common
{
    public class RedisSettings
    {
        public const string Key = "RedisSettings";

        [Required]
        public bool IsEnabled { get; set; }

        [RequiredIf("IsEnabled", true)]
        public string ConnectionString { get; set; }
    }
}
