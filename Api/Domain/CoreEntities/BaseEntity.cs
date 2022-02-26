using System;
using System.ComponentModel.DataAnnotations;
using Common.Enum;

namespace Domain.CoreEntities
{
    public class BaseEntity
    {
        [Key]
        public virtual long Id { get; set; }

        [Required]
        public virtual DateTime CreationTs { get; set; }


        [Required]
        public virtual string CreationUserId { get; set; }

        public virtual DateTime? LastChangeTs { get; set; }


        public virtual string LastChangeUserId { get; set; }

        [Required]
        public virtual StatusType Status { get; set; }

    }
}
