using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using ZeroImage.Database;
using ZeroImage.Database.Entities;

namespace ZeroImage.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        // GET: api/values
        [HttpGet]
        public String Get()
        {
            Debug.WriteLine("KOM TILL API METHOD");
            using (
                var context =
                    new ZiDbContext(
                        "Server = (localdb)\\MSSQLLocalDB;Database=ZiDB_DEV; Trusted_Connection = True;")
                )
            {
                var user = new User { Name = "TESTNAMN22", Identifier = "123422" };
                context.Users.Add(user);
                context.SaveChanges();
            }
            return "kom hit!";
        }
    }
}
