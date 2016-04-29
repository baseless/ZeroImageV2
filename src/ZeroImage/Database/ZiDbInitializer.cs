using System.Data.Entity;
using ZeroImage.Database.Entities;

namespace ZeroImage.Database
{
    public class ZiDbInitializer : DropCreateDatabaseAlways<ZiDbContext>
    {
        public override void InitializeDatabase(ZiDbContext context)
        {
            base.InitializeDatabase(context);
        }

        protected override void Seed(ZiDbContext context)
        {
            context.Users.Add(new User {Name = "base", NewIdentifier = "abc123", KeyStore = "U2FsdGVkX1+ZFI1P/btc6+qZoWmjViErtrrS/qYVzmsuFJyEZ43xoV+AREJk0qzO", PublicKey = "bZhx1Xw9qsLyRcRdnDJVdfhn4jN/lh/yHrfb1U+iumfP5WiFkapEoFOqi/DzVTrshs9rbHUJqJV/yWqkJybzZ3khlxBC54m4qefslh0it5fwPR/ntBMgsT6DmtYPqOreBVuQSx1fd22zIFpWhHIWqsDeVURoNwxKF0TfWDQRZR/U5sEOINggz2jgWsXaMT3kGPT0e+zb/0MkUsojlqNbRiTdnZksnRQ3VQAbQG6lWqG+01s5tcuIcwhlaZREWRLuixct5wXysEwNaB+m8iIL7ouLQaDexD9OvxO1EITID4vhHbVBlnMAUcpkG/TV8DbvwpfGIKSlOXsXWMqEORZE9Q==" });
            base.Seed(context);
        }
    }
}
