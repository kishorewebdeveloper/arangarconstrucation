using System;
using Caching.Abstractions;
using Common.Constants;
using ViewModel.Project;

namespace Queries.Project
{
    public class ProjectQuery : Query<ProjectViewModel>, ICacheable
    {
        public long Id { get; set; }

        public string Key { get; }
        public bool IsFromCache { get; set; }
        public ExpirationOptions Options { get; }

        public ProjectQuery(long id)
        {
            Id = id;
            Key = ApiRouteConstants.Project.GetByIdRoute.Replace("{id}", id.ToString());
            Options = new ExpirationOptions(TimeSpan.FromMinutes(15));
        }
    }
}