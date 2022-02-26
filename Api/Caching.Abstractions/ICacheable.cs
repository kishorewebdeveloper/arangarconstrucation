namespace Caching.Abstractions
{
    public interface ICacheable
    {
        string Key { get; }
        bool IsFromCache { get; set; }
        ExpirationOptions Options { get; }
    }
}
