using System.Data.Entity;

namespace ZeroImage.Database
{
    public class ZiDbInitializer : DropCreateDatabaseIfModelChanges<ZiDbContext>
    {
        public override void InitializeDatabase(ZiDbContext context)
        {
            base.InitializeDatabase(context);
        }

        protected override void Seed(ZiDbContext context)
        {
            base.Seed(context);
        }
    }
}
