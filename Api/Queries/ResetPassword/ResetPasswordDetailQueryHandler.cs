using System;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.ResetPassword;

namespace Queries.ResetPassword
{
    public class ResetPasswordDetailQueryHandler : IRequestHandler<ResetPasswordDetailQuery, ResetPasswordViewModel>
    {
        private readonly DatabaseContext context;

        public ResetPasswordDetailQueryHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<ResetPasswordViewModel> Handle(ResetPasswordDetailQuery request, CancellationToken cancellationToken)
        {
            var data = await context.ResetPasswordToken
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Token == request.Id
                                          && u.IsConsumed == false
                                          && DateTime.Now <= u.ExpirationTs, cancellationToken);

            if (data == null)
                return null;

            return new ResetPasswordViewModel
            {
                EmailAddress = data.EmailAddress,
                LostPasswordRequestToken = data.Token
            };
        }
    }
}

