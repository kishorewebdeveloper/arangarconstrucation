using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Queries.CommandAudit;
using ViewModel.Audit;

namespace Api.Controllers
{
    [ApiController]
    public class CommandAuditController : ControllerBase
    {
        private readonly IMediator mediator;
        
        public CommandAuditController(IMediator mediator )
        {
            this.mediator = mediator;
        }
 

        [HttpGet]
        [Route("api/commandaudits")]
        [Authorize]
        public async Task<IEnumerable<CommandAuditsViewModel>> GetCommandAudits(CancellationToken cancellationToken)
        {
            return await mediator.Send(new CommandAuditsQuery(), cancellationToken);
        }
    }
}