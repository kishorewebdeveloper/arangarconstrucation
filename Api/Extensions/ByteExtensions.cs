using System;
using System.IO;
using System.Linq;

namespace Extensions
{
    public static class ByteExtensions
    {
        public static string GetString(byte[] bytes)
        {
            var chars = new char[bytes.Length / sizeof(char)];
            Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
            return new string(chars); 
        } 
        
        public static Stream ToStream(this byte[] byteArray)
        {
          return new MemoryStream(byteArray);
        }

        public static bool IsEqual(this byte[] sourceBytes, byte[] destinationBytes)
        {
            return sourceBytes.SequenceEqual(destinationBytes);
        }
    }
}
