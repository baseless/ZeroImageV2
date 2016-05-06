using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class FinalizeRequestApiModel
    {
        public string KeyStore { get; set; }
        public string[] RequestIds { get; set; }
    }
}
