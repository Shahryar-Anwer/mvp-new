using Microsoft.EntityFrameworkCore;

namespace ApiSetupProject.Service
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        // DbSet properties here
        public DbSet<ConnectionString> ConnectionStrings { get; set; }
    }
    public class ConnectionString
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ConnectionStringDB { get; set; }
        public string DatabaseType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
