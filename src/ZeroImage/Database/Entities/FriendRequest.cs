using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ZeroImage.Database.Entities
{
    public class FriendRequest
    {
        public string Question { get; set; } //frågan i klartext
        public string Response { get; set; } //förfrågarens symmetriska nyckel, krypterad med frågesvar och sen med mottagarens public key.
        public string Verification { get; set; } //Ev hashad version av svaret för verifikation
    }
}
