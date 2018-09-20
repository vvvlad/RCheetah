using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using RCheetah.Data;

namespace RCheetah.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {


        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next(); //this means we are awaiting until the action being completed.

            var userName = resultContext.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUser(userName);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}
