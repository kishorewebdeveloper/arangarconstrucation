using System;
using Domain.CoreEntities;

namespace Domain.Entities
{
    public class ResetPasswordToken : BaseEntity
    {
        public string EmailAddress { get; set; }
        public Guid Token { get; set; }
        public DateTime ExpirationTs { get; set; }
        public bool IsConsumed { get; set; }
    }
}
