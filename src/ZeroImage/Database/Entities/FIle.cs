using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Database.Entities
{
    public class File
    {
        public File()
        {
            Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Path { get; set; }
        public string Meta { get; set; }
        [Required]
        public virtual User Owner { get; set; }
    }
}
