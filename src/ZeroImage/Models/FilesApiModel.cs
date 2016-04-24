using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class FilesApiModel
    {
        public string Path { get; set; }
        public Guid[] FileNames { get; set; }
    }
}
