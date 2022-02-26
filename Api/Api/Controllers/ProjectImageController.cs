using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
using Api.Extensions;
using Commands.ProjectImage;
using Common.Interface;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Queries.ProjectImageQuery;
using ViewModel.ProjectImage;

namespace Api.Controllers
{
    [ApiController]
    public class ProjectImageController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly ILoggedOnUserProvider user;

        public ProjectImageController(IMediator mediator, ILoggedOnUserProvider user)
        {
            this.mediator = mediator;
            this.user = user;
        }

        [HttpPost]
        [Route("api/projectimage")]
        [Authorize]
        public async Task<IActionResult> UploadImage(CancellationToken cancellationToken)
        {
            var uploadedFileWithDataViewModel = await Request.GetUploadedFileWithData();

            var command = new UploadProjectImageCommand(user)
            {
                FormData = uploadedFileWithDataViewModel.Value.FormData,
                FileViewModel = uploadedFileWithDataViewModel.Value.FileViewModel
            };

            var result = await mediator.Send(command, cancellationToken);
            return result.ToActionResult();
        }

        [HttpGet]
        [Route("api/projectimage/{projectId:long}")]
        [Authorize]
        public async Task<IEnumerable<ProjectImagesViewModel>> GetProjectImages(long projectId, CancellationToken cancellationToken)
        {
            return await mediator.Send(new ProjectImagesQuery(projectId), cancellationToken);
        }

        [HttpDelete]
        [Route("api/projectimage/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProjectImage(long id, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new DeleteProjectImageCommand(id, user), cancellationToken);
            return result.ToActionResult();
        }
    }
}
