using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class AnsweredRequestApiModel
    {
        public string UserName { get; set; }
        public string RequestId { get; set; }
        public string Payload { get; set; }
    }
}
