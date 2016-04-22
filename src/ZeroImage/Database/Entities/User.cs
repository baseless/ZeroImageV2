using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ZeroImage.Services;

namespace ZeroImage.Database.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string Name { get; set; }
        [Required]
        public string Identifier {
            get { return _identifier; }
            set { _identifier = SecurityService.Hash(value, Salt); }
        }

        [Required]
        public string Salt { get; set; } = SecurityService.GenerateSalt();
        public virtual ICollection<File> Files { get; set; } = new List<File>();

        private string _identifier;
    }
}
