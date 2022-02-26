using System.IO;
using System.Xml.Serialization;

namespace Extensions
{
    public static class XmlExtensions
    {
        public static string ToXml<T>(this T data)
        {
            try
            {
                if (data == null)
                    return string.Empty;

                XmlSerializer xmlSerializer = new XmlSerializer(data.GetType());

                using (StringWriter textWriter = new StringWriter())
                {
                    xmlSerializer.Serialize(textWriter, data);
                    return textWriter.ToString();
                }

            }
            catch (System.Exception ex)
            {
                var gg = ex;
            }
            return null;
        }



        public static T ToObject<T>(this string xmlString) where T : class, new()
        {
            if (string.IsNullOrEmpty(xmlString))
                return new T();

            var serializer = new XmlSerializer(typeof(T));
            using (var reader = new StringReader(xmlString))
            {
                try { return (T)serializer.Deserialize(reader); }
                catch { return null; } // Could not be deserialized to this type.
            }
        }
    }
}
