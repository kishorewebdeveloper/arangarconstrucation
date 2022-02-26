using System;
using System.Linq;
using Common.Enum;
using Domain.Entities;
using Extensions;

namespace Data.Extensions
{
    public static class SeedDataExtensions
    {
        public static void EnsureSeeded(this DatabaseContext context)
        {
            SeedUser(context);
        }

        private static void SeedUser(DatabaseContext context)
        {
            if (context.User.Any())
                return;

            var (hashedPassword, passwordKey) = "123456".ToPasswordHmacSha512Hash();

            context.User.Add(new User
            {
                FirstName = "Velkumar",
                LastName = "Santhanaraj",
                EmailAddress = "velkumars26@gmail.com",
                Password = hashedPassword,
                PasswordKey = passwordKey,
                MobileNumber = "9600155567",
                CreationTs = DateTime.UtcNow,
                CreationUserId = "System",
                LastChangeTs = DateTime.UtcNow,
                LastChangeUserId = "System",
                Status = StatusType.Enabled,
                RoleType = RoleType.SuperAdmin,
                IsEmailVerified = true,
                IsAccountLocked = false,
                IsSystemUser = true,
            });

            context.SaveChanges();
            context.SaveChanges();
        }
    }
}
