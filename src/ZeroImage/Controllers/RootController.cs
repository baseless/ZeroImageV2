using System.Security.Claims;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace ZeroImage.Controllers
{
    [Authorize]
    public class RootController : Controller
    {
        protected string GetUserName()
        {
            var identity = (ClaimsIdentity)User.Identity;
            return identity.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}
