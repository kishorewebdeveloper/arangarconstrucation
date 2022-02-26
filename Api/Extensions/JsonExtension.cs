using System.Text.Json;

namespace Extensions
{
    public static class JsonExtensions
    {
        public static string ToJson<T>(this T data, bool isIndented = false)
        {
            return JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = isIndented
            });
        }

        public static T ToDeserialize<T>(this string jsonString)
        {
            return !jsonString.HasValue() ? default : JsonSerializer.Deserialize<T>(jsonString);
        }
    }
}
