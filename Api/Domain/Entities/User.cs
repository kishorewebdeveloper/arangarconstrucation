using Common.Enum;
using Domain.CoreEntities;

namespace Domain.Entities
{
    public partial class User : BaseEntity
    {
        public string EmailAddress { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordKey { get; set; }
        public string MobileNumber { get; set; }
        public bool IsEmailVerified { get; set; }
        public bool IsAccountLocked { get; set; }
        public bool IsSystemUser { get; set; }
        public RoleType RoleType { get; set; }
    }
}
