using System;
using System.Security.Cryptography;
using System.Text;

namespace ZeroImage.Services
{
    public class SecurityService
    {
        public static string GenerateSalt()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var data = new byte[12];
                rng.GetBytes(data);
                return Convert.ToBase64String(data);
            } 
        }

        public static string Hash(string input, string salt)
        {
            var inputBytes = Encoding.UTF8.GetBytes(string.Concat(salt,input));
            var result = new SHA512Managed().ComputeHash(inputBytes);
            return Encoding.UTF8.GetString(result);
        }
    }
}
