using System.Threading.Tasks;
using Common.Interface;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Queries.Infrastructure;

namespace Api.Infrastructure
{
    public class TokenValidationAttribute : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.HttpContext.Request.Headers.TryGetValue("Authorization", out _))
            {
                var user = context.HttpContext.RequestServices.GetRequiredService<ILoggedOnUserProvider>();
                
                var isValidToken = await context.HttpContext.RequestServices.GetRequiredService<IMediator>().Send(new IsValidTokenQuery(user.UserId));
                if (!isValidToken)
                {
                    context.Result = new ContentResult
                    {
                        StatusCode = 401,
                        Content = "Invalid Token"
                    };
                    return;
                }
            }
            await next();
        }
    }
}
