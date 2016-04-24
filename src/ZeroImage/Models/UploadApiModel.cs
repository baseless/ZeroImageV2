using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Models
{
    public class UploadApiModel
    {
        [Required]
        public Guid FileName { get; set; }
        [Required]
        public string FileData { get; set; }
        [Required]
        public string Meta { get; set; }
    }
}
