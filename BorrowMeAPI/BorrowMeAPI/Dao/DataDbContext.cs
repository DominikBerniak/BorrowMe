using BorrowMeAPI.Model;
using BorrowMeAPI.Model.Entieties;

namespace BorrowMeAPI.Dao
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }



        }

        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AvailabilityNotification> AvailabilityNotifications { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<MainCategory> MainCategories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<PicturePath> PictureLocations { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Voivodeship> Voivodeships { get; set; }
    }
}
