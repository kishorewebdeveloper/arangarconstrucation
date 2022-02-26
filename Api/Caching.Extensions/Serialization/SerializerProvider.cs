﻿using System;
using Caching.Extensions.Enums;
using Caching.Extensions.Serialization.Providers;

namespace Caching.Extensions.Serialization
{
    public static class SerializerProvider
    {
        private static ISerializer @default;
        private static readonly Lazy<ISerializer> LazySerializerProvider;

        public static void SetDefaultSerializer(ISerializer customSerializer)
        {
            @default = customSerializer;
        }

        public static ISerializer Default => LazySerializerProvider.Value;

        static SerializerProvider()
        {
            static ISerializer InitSerializerFactory() => @default ??= new MessagePackSerializer();

            LazySerializerProvider = new Lazy<ISerializer>(InitSerializerFactory, false);
        }


        public static void SetDefaultSerializer(SerializerProviders provider)
        {
            @default = provider switch
            {
                SerializerProviders.MessagePack => new MessagePackSerializer(),
                SerializerProviders.NewtonsoftJson => new NewtonsoftJsonSerializer(),
                _ => throw new ArgumentOutOfRangeException(nameof(provider), provider, null)
            };
        }
    }


}
