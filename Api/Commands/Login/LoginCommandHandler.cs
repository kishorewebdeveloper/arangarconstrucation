using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Common.Constants;
using Common.Enum;
using Data;
using Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<IList<Claim>>>
    {
        private readonly ILogger logger;
        private readonly DatabaseContext context;

        public LoginCommandHandler(DatabaseContext context, ILogger logger)
        {
            this.context = context;
            this.logger = logger;
        }

        public async Task<Result<IList<Claim>>> Handle(LoginCommand command, CancellationToken token)
        {
            var userNameUpperCase = command.UserName.ToUpper();

            var user = await context.User
                .AsNoTracking()
                .FirstOrDefaultAsync(i => string.Equals(i.EmailAddress.ToUpper(), userNameUpperCase)
                                          && i.Status == StatusType.Enabled, token);

            if (user == null)
            {
                logger.Error("Invalid username or password - {@LoginCommand} ", command);
                return new FailureResult<IList<Claim>>("Invalid username or password");
            }

            if (!IsPasswordHashMatch(command.Password, user.Password, user.PasswordKey))
            {
                logger.Error("Invalid username or password - {@LoginCommand} ", command);
                return new FailureResult<IList<Claim>>("Invalid username or password");
            }

            if (!user.IsEmailVerified)
            {
                logger.Error("Email Address is not verified");
                return new FailureResult<IList<Claim>>("Email Address is not verified");
            }

            if (user.IsAccountLocked)
            {
                logger.Error("Your account has been locked. Please contact Administrator");
                return new FailureResult<IList<Claim>>("Your account has been locked. Please contact Administrator");
            }

            var claims = new List<Claim>
            {
                new(ClaimConstants.UserId,  user.Id.ToString()),
                new(ClaimConstants.FullName, user.FullName),
                new(ClaimConstants.Email, user.EmailAddress),
                new(ClaimConstants.Username, user.EmailAddress),
                new(ClaimConstants.RoleId, Convert.ToInt32(user.RoleType).ToString()),
                new(ClaimTypes.Role, user.RoleType.ToString())
            };

            return new SuccessResult<IList<Claim>>(claims);
        }

        private static bool IsPasswordHashMatch(string password, byte[] userPassword, byte[] userPasswordKey)
        {
            using var hmac = new HMACSHA512(userPasswordKey);
            var passwordHash = hmac.ComputeHash(password.ToByteArray());
            return passwordHash.IsEqual(userPassword);
        }
    }
}