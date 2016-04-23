using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
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
            return result ? Json(new { result = true }) : Json(new { result = false });
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> Create([FromBody]string name)
        {
            Debug.WriteLine("Received data: " + name);
            /*
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    Name = model.Name,
                    NewIdentifier = model.Identifier
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync(); 
            } */
            return Json(new { result = false });
        }
    }
}
