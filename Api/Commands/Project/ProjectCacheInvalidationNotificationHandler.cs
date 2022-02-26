using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Commands.RedisCache;
using Common.Constants;
using MediatR;

namespace Commands.Project
{
    public class ProjectCacheInvalidationNotificationHandler : INotificationHandler<ProjectCacheInvalidationNotification>
    {
        private readonly ICacheService cacheService;

        public ProjectCacheInvalidationNotificationHandler(ICacheService cacheService)
        {
            this.cacheService = cacheService;
        }

        public async Task Handle(ProjectCacheInvalidationNotification notification, CancellationToken cancellationToken)
        {
            var keys = new List<string>
            {
                ApiRouteConstants.Project.GetRoute,
                ApiRouteConstants.Project.GetProjectsWithImagesRoute,
                ApiRouteConstants.Project.GetByIdRoute.Replace("{id}", notification.Id.ToString())
            };

            await cacheService.InValidateCacheAsync(keys, cancellationToken);
            await Task.CompletedTask;
        }
    }
}
