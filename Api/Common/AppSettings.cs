namespace Common
{
    public class AppSettings
    {
        public const string Key = "AppSettings";

        public string Environment { get; set; }
        public string ClientUrl { get; set; }
        public string ResetPasswordUrl { get; set; }
    }
}
