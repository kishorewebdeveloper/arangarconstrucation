using System;

namespace ViewModel.ResetPassword
{
    public class ResetPasswordViewModel
    {
        public string EmailAddress { get; set; }
        public Guid? LostPasswordRequestToken { get; set; }
    }
}
