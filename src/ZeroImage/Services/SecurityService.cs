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
                var data = new byte[24];
                rng.GetBytes(data);
                return Convert.ToBase64String(data);
            } 
        }

        public static string Hash(string input, string salt)
        {
            var inputBytes = Encoding.UTF8.GetBytes(input);
            var sha = new SHA512Managed();
            var result = sha.ComputeHash(inputBytes);
            return Encoding.UTF8.GetString(result);
        }
    }
}
