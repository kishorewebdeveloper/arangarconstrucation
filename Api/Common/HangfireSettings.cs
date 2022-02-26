using System.ComponentModel.DataAnnotations;
using Common.CustomDataAnnotationsValidations;

namespace Common
{
    public class HangfireSettings
    {
        public const string Key = "HangfireSettings";

        [Required]
        public bool IsEnabled { get; set; }

        [RequiredIf("IsEnabled", true)]
        public string ConnectionString { get; set; }
    }
}
