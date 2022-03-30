using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using Commands.Project;
using Common.Constants;
using Common.Interface;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Queries.Project;
using ViewModel.Project;
using ViewModel.ProjectImage;

namespace Api.Controllers
{
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly ILoggedOnUserProvider user;

        public ProjectController(IMediator mediator, ILoggedOnUserProvider user)
        {
            this.mediator = mediator;
            this.user = user;
        }

        [HttpPost]
        [Route(ApiRouteConstants.Project.SaveRoute)]
        [Authorize]
        public async Task<IActionResult> SaveProject([FromBody] SaveProjectCommand command, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(command, cancellationToken);
            return result.ToActionResult();
        }

        [HttpGet]
        [Route(ApiRouteConstants.Project.GetRoute)]
        [Authorize]
        public async Task<IEnumerable<ProjectsViewModel>> GetProjects(CancellationToken cancellationToken)
        {
            return await mediator.Send(new ProjectsQuery(), cancellationToken);
        }

        [HttpGet]
        [Route(ApiRouteConstants.Project.GetProjectsWithImagesRoute)]
        [AllowAnonymous]
        public async Task<IEnumerable<ProjectsWithImagesViewModel>> GetProjectsWithImages(CancellationToken cancellationToken)
        {
            return await mediator.Send(new ProjectsWithImagesQuery(), cancellationToken);
        }

        [HttpGet]
        [Route("api/project/{id:long}")]
        [Authorize]
        public async Task<ProjectViewModel> GetProject(long id, CancellationToken cancellationToken)
        {
            return await mediator.Send(new ProjectQuery(id), cancellationToken);
        }

        [HttpDelete]
        [Route("api/project/{id:long}")]
        [Authorize]
        public async Task<IActionResult> DeleteProject(long id, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new DeleteProjectCommand(id, user), cancellationToken);
            return result.ToActionResult();
        }
    }
}
