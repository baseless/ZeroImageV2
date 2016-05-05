using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.AspNet.Hosting.Internal;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Server.Kestrel;
using Microsoft.Extensions.PlatformAbstractions;
using ZeroImage.Database;
using ZeroImage.Models;
using File = ZeroImage.Database.Entities.File;

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


        [HttpGet]
        public IActionResult GetFiles()
        {
            var name = User.Identity.Name;
            var model = new FilesApiModel
            {
                Path = string.Concat("/gallery/", name),
                FileNames = _context.Files.Where(f => f.Owner.Name.Equals(name)).Select(o => o.Id).ToArray()
            };

            return Json(model);
        }

        [HttpGet("{name}")]
        public IActionResult GetFiles(string name)
        {
            var model = new FilesApiModel
            {
                Path = string.Concat("/gallery/", name),
                FileNames = _context.Files.Where(f => f.Owner.Name.Equals(name)).Select(o => o.Id).ToArray()
            };

            return Json(model);
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
                    System.IO.File.WriteAllText(string.Concat(path,model.FileName,".txt"), model.FileData);
                    System.IO.File.WriteAllText(string.Concat(path, model.FileName,".meta.txt"), model.Meta);

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
