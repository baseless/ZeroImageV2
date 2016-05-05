using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class ResponseRequestApiModel
    {
        public string RequestId { get; set; }
        public string UserName { get; set; }
        public string Question { get; set; }
        public string Payload { get; set; }
        public string PublicKey { get; set; }
    }
}
