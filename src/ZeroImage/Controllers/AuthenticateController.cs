using System.Diagnostics;
using System.Linq;
using Microsoft.AspNet.Mvc;
using ZeroImage.Database;
using ZeroImage.Services;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {
        private readonly ZiDbContext _context;

        public AuthenticateController(ZiDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userName}/{password}")]
        public IActionResult Login(string userName, string password)
        {
            Debug.Write("Received request for " + userName + " - " + password);
            var user = _context.Users.FirstOrDefault(u => u.Name.Equals(userName));
            if (user != null && user.Identifier.Equals(SecurityService.Hash(password, user.Salt)))
            {
                    return Json(new { result = true });
            }
            return Json(new { result = false });
        }
    }
}
