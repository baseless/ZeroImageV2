using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ZeroImage.Services;

namespace ZeroImage.Database.Entities
{
    public class User
    {
        public User()
        {
            Salt = SecurityService.GenerateSalt();
        }

        [NotMapped]
        public string NewIdentifier { set { Identifier = SecurityService.Hash(value, Salt); } }
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string Name { get; set; }
        [Required]
        public string Identifier { get; set; }
        [Required]
        public string Salt { get; set; }
        public virtual ICollection<File> Files { get; set; } = new List<File>();
    }
}
