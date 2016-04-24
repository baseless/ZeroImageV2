using System.Diagnostics;
using System.Linq;
using Microsoft.AspNet.Hosting.Internal;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Server.Kestrel;
using Microsoft.Extensions.PlatformAbstractions;
using ZeroImage.Database;
using ZeroImage.Database.Entities;
using ZeroImage.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ZeroImage.Controllers
{
    [Route("api/[controller]")]
    public class FileController : RootController
    {
        private readonly IApplicationEnvironment _env;
        private readonly ZiDbContext _context;

        public FileController(ZiDbContext context, IApplicationEnvironment env)
        {
            _env = env;
            _context = context;
        }

        [HttpPost]
        public IActionResult Upload([FromBody]UploadApiModel model)
        {
            if (ModelState.IsValid)
            {
                var owner = _context.Users.FirstOrDefault(u => u.Name.Equals(User.Identity.Name));
                if (owner != null)
                {
                    var path = string.Concat(_env.ApplicationBasePath,@"\wwwroot\gallery\",GetUserName(),@"\");

                    (new System.IO.FileInfo(path)).Directory.Create();
                    System.IO.File.WriteAllText(string.Concat(path,model.FileName), model.FileData);
                    System.IO.File.WriteAllText(string.Concat(path, model.FileName,".meta"), model.Meta);

                    var file = new File { Id = model.FileName, Owner = owner };
                    _context.Files.Add(file);
                    _context.SaveChanges();
                    return Json(new {result = true});
                }
            }
            return Json(new { result = false });
        }
    }
}
