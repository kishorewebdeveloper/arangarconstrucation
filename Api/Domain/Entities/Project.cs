﻿using System.Collections.Generic;
using Common.Enum;
using Domain.CoreEntities;

namespace Domain.Entities
{
    public partial class Project : BaseEntity
    {
        public Project()
        {
            ProjectImages = new HashSet<ProjectImage>();
        }

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
       
        public ICollection<ProjectImage> ProjectImages { get; set; }
    }

}
