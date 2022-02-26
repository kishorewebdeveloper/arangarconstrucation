using System.Collections.Generic;
using ViewModel.ProjectImage;

namespace Queries.ProjectImageQuery
{
    public class ProjectImagesQuery : Query<IEnumerable<ProjectImagesViewModel>> 
    {
        public long ProjectId { get; set; }
      
        public ProjectImagesQuery(long projectId)
        {
            ProjectId = projectId;
        }
    }
}