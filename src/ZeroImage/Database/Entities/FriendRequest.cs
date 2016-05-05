using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Database.Entities
{
    public class FriendRequest
    {
        public FriendRequest()
        {
            Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }

        public string OriginUserName { get; set; }
        public string TargetUserName { get; set; }

        public virtual User OriginUser { get; set; }
        public virtual User TargetUser { get; set; }

        [Required]
        public string Question { get; set; } //frågan i klartext
        [Required]
        public string OriginPayload { get; set; } //förfrågarens symmetriska nyckel, krypterad med frågesvar och sen med mottagarens public key.
        public string TargetPayload { get; set; }
        [Required]
        public bool Completed { get; set; } = false;
    }
}
