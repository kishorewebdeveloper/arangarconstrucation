using System;
using Common;

namespace Commands.ForgotPassword
{
    public class SendPasswordResetEmailCommand : Command<Result<Guid>>
    {
        public string EmailAddress { get; set; }
    }
}
