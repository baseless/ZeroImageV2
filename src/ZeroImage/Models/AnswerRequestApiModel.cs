using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class AnswerRequestApiModel
    {
        public Guid RequestId { get; set; }
        public string Payload { get; set; }
        public string KeyStore { get; set; }
    }
}
