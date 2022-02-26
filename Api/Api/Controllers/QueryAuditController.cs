using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.QueryAudit;
using ViewModel.Audit;

namespace Api.Controllers
{
    [ApiController]
    public class QueryAuditController : ControllerBase
    {
        private readonly IMediator mediator;
   

        public QueryAuditController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        [Route("api/queryaudits")]
        //[Authorize]
        public async Task<IEnumerable<QueryAuditsViewModel>> GetQueryAudits(CancellationToken cancellationToken)
        {
            return await mediator.Send(new QueryAuditsQuery(), cancellationToken);
        }
    }
}