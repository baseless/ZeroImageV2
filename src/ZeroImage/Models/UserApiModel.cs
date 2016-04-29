using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class UserApiModel
    {
        public string Name { get; set; }
        public string Identifier { get; set; }
        public string KeyStore { get; set; }
        public string PublicKey { get; set; }
    }
}
