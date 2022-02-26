using Common;
using ElmahCore;
using Microsoft.AspNetCore.Mvc;

namespace Api.Extensions
{
    public static class ResultExtensions
    {
        public static IActionResult ToActionResult(this Result result)
        {
            if (!result.IsFailure)
                return new OkResult();

            if (result.HasException)
                ElmahExtensions.RiseError(result.Exception);
           
            return new BadRequestObjectResult(result.HtmlFormattedFailures);
        }

        public static IActionResult ToActionResult<T>(this Result<T> result)
        {
            if (result.IsSuccess)
                return new JsonResult(result.Value);

            if (result.HasException)
                ElmahExtensions.RiseError(result.Exception);
            
            else if (result.IsFailure)
                ElmahExtensions.RiseError(result.Exception);
           
            return new BadRequestObjectResult(result.HtmlFormattedFailures);
        }
    }
}
