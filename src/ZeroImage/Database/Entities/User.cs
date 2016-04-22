using System;
using System.ComponentModel.DataAnnotations;

namespace ZeroImage.Database.Entities
{
    public class User
    {
        public User()
        {
            Id = Guid.NewGuid().ToString();
        }

        [Key]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Name2 { get; set; }
    }
}
