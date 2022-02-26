using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ViewModel.User;
 

namespace Queries.User
{
    public class UsersQueryHandler : IRequestHandler<UsersQuery, IEnumerable<UsersViewModel>>
    {
        private readonly IMapper mapper;
        private readonly DatabaseContext context;

        public UsersQueryHandler(IMapper mapper, DatabaseContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<UsersViewModel>> Handle(UsersQuery request, CancellationToken cancellationToken)
        {
            var data = await context.User
                .AsNoTracking()
                .ToListAsync(cancellationToken);

            return data.Select(mapper.Map<UsersViewModel>).ToList();
        }
    }
}