using System;
using ViewModel.ResetPassword;

namespace Queries.ResetPassword
{
    public class ResetPasswordDetailQuery : Query<ResetPasswordViewModel>
    {
        public ResetPasswordDetailQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
