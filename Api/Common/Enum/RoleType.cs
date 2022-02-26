using System.ComponentModel;

namespace Common.Enum
{
    public enum RoleType : byte
    {
        [Description("Super Admin")]
        SuperAdmin = 1,

        [Description("Admin")]
        Admin,

        [Description("User")]
        User,
    }
}
