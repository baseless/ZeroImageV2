using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Database.Entities
{
    public class File
    {
        [Key]
        public Guid Id { get; set; }
        public virtual User Owner { get; set; }
    }
}
