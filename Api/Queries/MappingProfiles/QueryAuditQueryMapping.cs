using AutoMapper;
using ViewModel.Audit;

namespace Queries.MappingProfiles
{
    public class QueryAuditQueryMapping : Profile
    {
        public QueryAuditQueryMapping()
        {
            CreateMap<Domain.CoreEntities.QueryAudit, QueryAuditsViewModel>();
        }
    }
}
