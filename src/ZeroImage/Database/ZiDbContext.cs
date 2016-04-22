using System.Data.Entity;
using ZeroImage.Database.Entities;

namespace ZeroImage.Database
{
    [DbConfigurationType(typeof(CodeConfig))]
    public class ZiDbContext : DbContext
    {
        static ZiDbContext()
        {
            System.Data.Entity.Database.SetInitializer(new ZiDbInitializer());
        }

        public DbSet<User> Users { get; set; }

        public ZiDbContext(string connectionString) : base(connectionString)
        {

        }
    }

    public class CodeConfig : DbConfiguration
    {
        public CodeConfig()
        {
            SetProviderServices("System.Data.SqlClient",
                System.Data.Entity.SqlServer.SqlProviderServices.Instance);
        }
    }
}
