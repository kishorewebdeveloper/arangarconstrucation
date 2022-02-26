using System;
using System.Collections.Generic;
using Caching.Abstractions;
using Common.Constants;
using ViewModel.Project;

namespace Queries.Project
{
    public class ProjectsWithImagesQuery : Query<IEnumerable<ProjectsWithImagesViewModel>>, ICacheable
    {
        public string Key { get; }
        public bool IsFromCache { get; set; }
        public ExpirationOptions Options { get; }

        public ProjectsWithImagesQuery()
        {
            Key = ApiRouteConstants.Project.GetProjectsWithImagesRoute;
            Options = new ExpirationOptions(TimeSpan.FromMinutes(15));
        }
    }
}