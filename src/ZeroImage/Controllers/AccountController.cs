using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class AccountController : Controller
    {
        [HttpGet("exists/{userName}"), AllowAnonymous]
        public IActionResult Exists(string userName = "")
        {
            return userName.Equals("sven") ? Json(new { result = true }) : Json(new { result = false, name = userName });
        }
    }
}
