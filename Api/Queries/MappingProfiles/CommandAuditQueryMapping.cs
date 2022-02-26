using AutoMapper;
using ViewModel.Audit;

namespace Queries.MappingProfiles
{
    public class CommandAuditQueryMapping : Profile
    {
        public CommandAuditQueryMapping()
        {
            CreateMap<Domain.CoreEntities.CommandAudit, CommandAuditsViewModel>();
        }
    }
}
