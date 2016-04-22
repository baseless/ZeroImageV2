using Microsoft.AspNet.Mvc;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticateController : Controller
    {
        [HttpPost]
        public IActionResult Login(string userName, string password)
        {
            if (userName != null && password != null)
            {
                return Json(new { result = true });
            }
            return Json(new { result = false });
        }
    }
}
