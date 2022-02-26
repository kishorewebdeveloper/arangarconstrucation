using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using Commands.Users;
using Common.Interface;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Queries.User;
using ViewModel.User;

namespace Api.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly ILoggedOnUserProvider user;

        public UserController(IMediator mediator, ILoggedOnUserProvider user)
        {
            this.mediator = mediator;
            this.user = user;
        }

        [HttpPost]
        [Route("api/user")]
        public async Task<IActionResult> SaveUser([FromBody] SaveUserCommand command, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(command, cancellationToken);
            return result.ToActionResult();
        }

        [HttpGet]
        [Route("api/users")]
        //[Authorize]
        public async Task<IEnumerable<UsersViewModel>> GetUsers(CancellationToken cancellationToken)
        {
            return await mediator.Send(new UsersQuery(), cancellationToken);
        }

        [HttpGet]
        [Route("api/user/{id:long}")]
       // [Authorize]
        public async Task<UserViewModel> GetUser(long id, CancellationToken cancellationToken)
        {
            return await mediator.Send(new UserQuery(id), cancellationToken);
        }

        [HttpDelete]
        [Route("api/user/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(long id, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new DeleteUserCommand(id, user), cancellationToken);
            return result.ToActionResult();
        }
    }
}