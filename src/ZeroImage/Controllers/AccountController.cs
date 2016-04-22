using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using ZeroImage.Database;
using ZeroImage.Database.Entities;
using ZeroImage.Models;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class AccountController : Controller
    {
        private readonly ZiDbContext _context;

        public AccountController(ZiDbContext context)
        {
            _context = context;
        }

        [HttpGet("exists/{userName}"), AllowAnonymous]
        public IActionResult Exists(string userName = "")
        {
            var result = false;
            if (!string.IsNullOrEmpty(userName))
            {
                result = _context.Users.Count(u => u.Name.Equals(userName)) > 0;
            }
            return result ? Json(new { exists = true }) : Json(new { exists = false });
        }

        [HttpPost, AllowAnonymous]
        public async Task Create(UserApiModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    Name = model.Name,
                    Identifier = model.Identifier
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
