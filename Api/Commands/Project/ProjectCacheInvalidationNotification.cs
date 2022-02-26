using MediatR;

namespace Commands.Project
{
    public record ProjectCacheInvalidationNotification(long Id) : INotification;
}