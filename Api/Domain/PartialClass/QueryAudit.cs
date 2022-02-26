using System;
using System.ComponentModel.DataAnnotations.Schema;
using Common.Interface;

namespace Domain.CoreEntities
{
    public partial class QueryAudit
    {
        [NotMapped]
        public DateTime CreatedTime { get; set; }

        public void ModifyDatesToDisplay(ILoggedOnUserProvider user)
        {
            CreatedTime = user.DisplayUserTimeFromUtc(UtcTimeStamp);
        }
    }
}
