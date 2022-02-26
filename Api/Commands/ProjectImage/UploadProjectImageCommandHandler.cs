using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Data;
using Data.Extensions;
using Extensions;
using MediatR;

namespace Commands.ProjectImage
{
    public class UploadProjectImageCommandHandler : IRequestHandler<UploadProjectImageCommand, Result<long>>
    {
        private readonly DatabaseContext context;
      
        public UploadProjectImageCommandHandler(DatabaseContext context)
        {
            this.context = context;
        }

        public async Task<Result<long>> Handle(UploadProjectImageCommand command, CancellationToken cancellationToken)
        {
            var fileViewModel = command.FileViewModel;

            var entity = new Domain.Entities.ProjectImage
            {
                ProjectId = Convert.ToInt64(command.FormData.SingleOrDefault(a => a.Key == "ProjectId").Value),
                FileName = fileViewModel.Name,
                ContentType = fileViewModel.ContentType,
                Size = fileViewModel.Length.ToFileSize(),
                Data = fileViewModel.Data
            };

            entity.PopulateMetaData(command.LoggedOnUserId.ToString());
            await context.ProjectImage.AddAsync(entity, cancellationToken);

            await context.SaveChangesAsync(command, cancellationToken);
            return new SuccessResult<long>(entity.Id);
        }

    }
}
