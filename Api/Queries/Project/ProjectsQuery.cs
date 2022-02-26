using System;
using System.Collections.Generic;
using Caching.Abstractions;
using Common.Constants;
using ViewModel.Project;

namespace Queries.Project
{
    public class ProjectsQuery : Query<IEnumerable<ProjectsViewModel>>, ICacheable
    {
        public string Key { get; }
        public bool IsFromCache { get; set; }
        public ExpirationOptions Options { get; }

        public ProjectsQuery()
        {
            Key = ApiRouteConstants.Project.GetRoute;
            Options = new ExpirationOptions(TimeSpan.FromMinutes(15));
        }
    }
}