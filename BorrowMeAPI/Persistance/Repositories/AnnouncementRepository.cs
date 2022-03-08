using Core.Model.DataTransferObjects;
using Core.Repositories;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories
{
    public class AnnouncementRepository : IAnnouncementRepository
    {
        private readonly DataDbContext _dbContext;

        public AnnouncementRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Announcement>> GetAnnouncementsByFilters(SearchedAnnouncementFilterDto searchFilter)
        {
            var announcements = _dbContext.Announcements
                .Include(a => a.PictureLocations)
                .Include(a => a.Owner)
                .Include(a => a.SubCategory)
                .Include(a => a.City)
                .Include(c => c.Voivodeship)
                .AsQueryable();

            var mainCategories = await _dbContext.MainCategories
                .Include(mc => mc.SubCategories)
                .ToListAsync();

            if (searchFilter.CategoryName != "all")
            {
                var mainCategory = mainCategories.Where(mc => mc.Name.ToLower() == searchFilter.CategoryName.ToLower()).FirstOrDefault();
                if (mainCategory is not null)
                {
                    announcements = announcements.Where(a => mainCategory.SubCategories.Contains(a.SubCategory));
                }
                else
                {
                    announcements = announcements.Where(a => a.SubCategory.Name == searchFilter.CategoryName);
                }
            }
            if (searchFilter.VoivodeshipName != "all")
            {
                announcements = announcements.Where(a => a.Voivodeship.Name == searchFilter.VoivodeshipName);
            }
            if (searchFilter.CityName != "all")
            {
                announcements = announcements.Where(a => a.City.Name == searchFilter.CityName);
            }
            if (searchFilter.SearchPhrase != "all")
            {
                announcements = announcements.Where(a => a.Title.ToLower().Contains(searchFilter.SearchPhrase.ToLower()) || 
                a.Description.ToLower().Contains(searchFilter.SearchPhrase.ToLower()));
            }
            announcements = announcements.Where(a => a.Price >= searchFilter.CostMin && a.Price <= searchFilter.CostMax);
            if (searchFilter.SortDirection == "desc")
            {
                switch (searchFilter.SortBy)
                {
                    case "publishDate":
                        announcements = announcements.OrderByDescending(a => a.PublishDate);
                        break;
                    case "cost":
                        announcements = announcements.OrderByDescending(a => a.Price);
                        break;
                }
            }
            if (searchFilter.SortDirection == "asc")
            {
                switch (searchFilter.SortBy)
                {
                    case "publishDate":
                        announcements = announcements.OrderBy(a => a.PublishDate);
                        break;
                    case "cost":
                        announcements = announcements.OrderBy(a => a.Price);
                        break;
                }
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

        public async Task<Announcement> GetAnnouncementById(Guid announcementId)
        {
            var announcements = _dbContext.Announcements
                .Include(a => a.PictureLocations)
                .Include(a => a.Owner)
                .ThenInclude(o => o.PictureLocation)
                .Include(a => a.SubCategory)
                .Include(a => a.City)
                .Include(c => c.Voivodeship)
                .AsQueryable();
            announcements = announcements.Where(a => a.Id == announcementId);
            return await announcements.FirstOrDefaultAsync();
        }

        public async Task<Announcement> AddNewAnnouncement(CreateAnnouncementDto announcementData,Announcement newAnnouncement)
        {
            var owner = await _dbContext.Users.FindAsync(announcementData.OwnerId);
            var subCategory = await _dbContext.SubCategories.FindAsync(announcementData.SubCategoryId);
            var city = await _dbContext.Cities.FirstOrDefaultAsync(c => c.Name == announcementData.CityName);
            var voivodeship = await _dbContext.Voivodeships.FirstOrDefaultAsync(v => v.Name == announcementData.VoivodeshipName);
            newAnnouncement.Owner = owner;
            newAnnouncement.SubCategory = subCategory;
            newAnnouncement.City = city;
            newAnnouncement.Voivodeship = voivodeship;
            await _dbContext.Announcements.AddAsync(newAnnouncement);
            await _dbContext.SaveChangesAsync();
            return newAnnouncement;
        }
    }
}
