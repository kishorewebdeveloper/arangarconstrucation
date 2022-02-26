using System;
using Common;

namespace Commands.ResetPassword
{
    public class ResetPasswordCommand : Command<Result>
    {
        public string EmailAddress { get; set; }
        public Guid TokenGuid { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}