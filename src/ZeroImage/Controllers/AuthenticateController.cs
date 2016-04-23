using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using ZeroImage.Database;
using ZeroImage.Services;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class AuthenticateController : RootController
    {
        private readonly ZiDbContext _context;

        public AuthenticateController(ZiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult AuthenticatedAs()
        {
            return Json(new { Name = GetUserName() });
        }

        [HttpGet("{userName}/{password}"), AllowAnonymous]
        public async Task<IActionResult> Login(string userName, string password)
        {
            Debug.Write("Received request for " + userName + " - " + password);
            var user = _context.Users.FirstOrDefault(u => u.Name.Equals(userName));
            if (user != null && user.Identifier.Equals(SecurityService.Hash(password, user.Salt)))
            {
                var identity = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Name)
                }, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                return Json(new { result = true });
            }
            return Json(new { result = false });
        }
    }
}
