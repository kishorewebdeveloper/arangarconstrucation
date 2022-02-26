using System;
using System.Threading.Tasks;
using Api.Extensions;
using Commands.ForgotPassword;
using Commands.ResetPassword;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.ResetPassword;
using ViewModel.ResetPassword;

namespace Api.Controllers
{
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IMediator mediatr;

        public ForgotPasswordController(IMediator mediatr)
        {
            this.mediatr = mediatr;
        }


        [HttpPost]
        [Route("api/forgotpassword")]
        public async Task<IActionResult> RequestForResetPassword(SendPasswordResetEmailCommand command)
        {
            var result = await mediatr.Send(command);
            return result.ToActionResult();
        }

        [HttpGet]
        [Route("api/resetpassword/{id:Guid}")]
        public async Task<ResetPasswordViewModel> GetResetPasswordDetail(Guid id)
        {
            return await mediatr.Send(new ResetPasswordDetailQuery(id));
        }

        [HttpPost]
        [Route("api/resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordCommand command)
        {
            var result = await mediatr.Send(command);
            return result.ToActionResult();
        }
    }
}
