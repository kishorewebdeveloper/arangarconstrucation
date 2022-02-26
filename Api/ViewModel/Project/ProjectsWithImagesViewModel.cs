using System.Collections.Generic;
using Common.Enum;
using ViewModel.ProjectImage;

namespace ViewModel.Project
{
    public class ProjectsWithImagesViewModel
    {
        public long Id { get; set; }
        public string ProjectName { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int PinCode { get; set; }
        public string LandMark { get; set; }
        public string BHK { get; set; }
        public string Features { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public ServiceType ServiceType { get; set; }
        public List<ProjectImagesViewModel> ProjectImages { get; set; }
    }
}
