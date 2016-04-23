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
            context.Users.Add(new User {Name = "base", NewIdentifier = "abc123"});
            base.Seed(context);
        }
    }
}
