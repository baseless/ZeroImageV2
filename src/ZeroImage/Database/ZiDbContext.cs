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
        public DbSet<File> Files { get; set; }
        public DbSet<FriendRequest> Requests { get; set; }

        public ZiDbContext(string connectionString) : base(connectionString)
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FriendRequest>()
                        .HasRequired(m => m.OriginUser)
                        .WithMany(t => t.SentRequests)
                        .HasForeignKey(m => m.OriginUserName)
                        .WillCascadeOnDelete(false);

            modelBuilder.Entity<FriendRequest>()
                        .HasRequired(m => m.TargetUser)
                        .WithMany(t => t.ReceivedRequests)
                        .HasForeignKey(m => m.TargetUserName)
                        .WillCascadeOnDelete(false);
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
