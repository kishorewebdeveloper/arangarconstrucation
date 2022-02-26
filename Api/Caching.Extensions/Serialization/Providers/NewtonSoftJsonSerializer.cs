using System.Text;
using Extensions;

namespace Caching.Extensions.Serialization.Providers
{
    public class NewtonsoftJsonSerializer : ISerializer
    {
        public byte[] Serialize<T>(T obj)
        {
            var jsonString = obj.ToJson();
            return Encoding.UTF8.GetBytes(jsonString);
        }

        public T Deserialize<T>(byte[] bytes)
        {
            var bytesString = Encoding.UTF8.GetString(bytes);
            return bytesString.ToDeserialize<T>();
        }
    }
}