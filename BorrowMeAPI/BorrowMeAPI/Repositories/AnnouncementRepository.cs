namespace BorrowMeAPI.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly DataDbContext _dbContext;

        public AnnouncementRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Announcement>> GetAnnouncementsByFilters(string category, string voivodeship, string city, string searchPhrase)
        {
            var announcements = _dbContext.Announcements
                .Include(a => a.PictureLocations)
                .Include(a => a.Owner)
                .Include(a => a.SubCategory)
                .Include(a => a.City)
                .Include(c => c.Voivodeship)
                .AsQueryable();
            if (category != "all")
            {
                announcements = announcements.Where(a => a.SubCategory.Name == category);
            }
            if (voivodeship != "all")
            {
                announcements = announcements.Where(a => a.Voivodeship.Name == voivodeship);
            }
            if (city != "all")
            {
                announcements = announcements.Where(a => a.City.Name == city);
            }
            if (searchPhrase != "all")
            {
                announcements = announcements.Where(a => a.Title.ToLower().Contains(searchPhrase.ToLower()) || a.Description.ToLower().Contains(searchPhrase.ToLower()));
            }

            return await announcements.ToListAsync();
        }
        public async Task<List<Announcement>> GetAllAnnouncements()
        {
            var announcements = _dbContext.Announcements
                .Include(a => a.PictureLocations)
                .Include(a => a.Owner)
                .ThenInclude(o=>o.PictureLocation)
                .Include(a => a.SubCategory)
                .Include(a => a.City)
                .Include(c => c.Voivodeship)
                .AsQueryable();
            return await announcements.ToListAsync();
        }

    }
}
