using Microsoft.EntityFrameworkCore;

namespace BorrowMeAPI.Dao
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {
        }

        public DbSet<Announcement> Announcement { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<ProductAvailabilityNotification> ProductAvailabilityNotification { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Voivodship> Voivoship { get; set; }



    }
}
