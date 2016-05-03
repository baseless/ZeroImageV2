using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Authentication.Cookies;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using ZeroImage.Database;
using ZeroImage.Models;
using ZeroImage.Services;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticateController : RootController
    {
        private readonly ZiDbContext _context;

        public AuthenticateController(ZiDbContext context)
        {
            _context = context;
        }

        [HttpGet("signout")]
        public async Task<IActionResult> SignOut()
        {
            await HttpContext.Authentication.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Json(new { result = true });
        }

        [HttpGet("loggedon"), AllowAnonymous]
        public IActionResult IsAuthenticated()
        {
            return GetUserName() != null ? Json(new {result = true}) : Json(new {result = false});
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticateApiModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Name.Equals(model.Name));
            if (user != null && user.Identifier.Equals(SecurityService.Hash(model.Identifier, user.Salt)))
            {
                var identity = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Name)
                }, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                // Return encrypted key store
                return Json(new { result = true, keyStore = user.KeyStore });
            }
            return Json(new { result = false });
        }
    }
}
