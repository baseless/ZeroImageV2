using System;
using System.Collections.Generic;
using System.Data.Entity;
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
    [Route("api/[controller]")]
    public class RequestController : RootController
    {
        private readonly ZiDbContext _context;

        public RequestController(ZiDbContext context)
        {
            _context = context;
        }

        [HttpGet("single/{id}")]
        public async Task<IActionResult> GetRequest(Guid id)
        {
            var request = await _context.Requests.Where(x => x.Id.Equals(id) && x.Completed.Equals(false)).FirstOrDefaultAsync();

            if (request != null)
            {
                var resp = new ResponseRequestApiModel
                {
                    UserName = request.OriginUserName,
                    Payload = request.OriginPayload,
                    Question = request.Question,
                    RequestId = request.Id.ToString()
                };
                return Json(resp);
            }
            return Json("");
        }

        [HttpGet("incoming")]
        public IActionResult GetRequests()
        {
            var requests = _context.Requests.Where(x => x.TargetUser.Name.Equals(User.Identity.Name) && x.Completed.Equals(false)).Select(s => 
            new ResponseRequestApiModel
            {
                UserName = s.OriginUserName.ToString(),
                Payload = s.OriginPayload,
                Question = s.Question,
                RequestId = s.Id.ToString()
            }).ToArray();
            return Json(requests);
        }

        [HttpPost("new")]
        public async Task<IActionResult> RegisterRequest([FromBody]NewRequestApiModel model)
        {
            if(!ModelState.IsValid) return Json(new { result = "Request invalid" });

            var targetUser = await _context.Users.FindAsync(model.UserName);
            if (targetUser != null && !targetUser.Name.Equals(User.Identity.Name))
            {
                var requestCount = _context.Requests.Count(x => 
                    (x.OriginUser.Name.Equals(User.Identity.Name) && x.TargetUser.Name.Equals(targetUser.Name)) ||
                    (x.TargetUser.Name.Equals(User.Identity.Name) && x.OriginUser.Name.Equals(targetUser.Name)));
                if (requestCount == 0)
                {
                    var originUser = await _context.Users.FindAsync(User.Identity.Name);
                    var request = new FriendRequest
                    {
                        OriginUser = originUser,
                        OriginPayload = model.Payload,
                        TargetUser = targetUser,
                        Question = model.Question
                    };
                    _context.Requests.Add(request);
                    await _context.SaveChangesAsync();
                    return Json(new { result = "" });
                }
                else
                {
                    return Json(new { result = "Friend request already exists" });
                }
            }

            return Json(new { result = "Request failed" });
        }
    }
}
