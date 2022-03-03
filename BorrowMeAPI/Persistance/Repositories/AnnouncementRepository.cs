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

        public async Task<List<Announcement>> GetAnnouncementsByFilters(string category, string voivodeship, string city, string searchPhrase, int costMin, int costMax, string sortBy, string sortDirection)
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

            if (category != "all")
            {
                var mainCategory = mainCategories.Where(mc => mc.Name.ToLower() == category.ToLower()).FirstOrDefault();
                if (mainCategory is not null)
                {
                    announcements = announcements.Where(a => mainCategory.SubCategories.Contains(a.SubCategory));
                }
                else
                {
                    announcements = announcements.Where(a => a.SubCategory.Name == category);
                }
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
            announcements = announcements.Where(a => a.Price >= costMin && a.Price <= costMax);
            if (sortDirection == "desc")
            {
                switch (sortBy)
                {
                    case "publishDate":
                        announcements = announcements.OrderByDescending(a => a.PublishDate);
                        break;
                    case "cost":
                        announcements = announcements.OrderByDescending(a => a.Price);
                        break;
                }
            }
            if (sortDirection == "asc")
            {
                switch (sortBy)
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

        public async Task<Announcement> AddNewAnnouncement(AnnouncementDTO announcementDTO)
        {
            var owner = _dbContext.Users.FirstOrDefault(u => u.Id == announcementDTO.UserId);
            var subCategory = _dbContext.SubCategories.FirstOrDefault(sc => sc.Id == announcementDTO.SubCategoryId);
            var city = _dbContext.Cities.FirstOrDefault(c => c.Id == announcementDTO.CityId);
            var voivodeship = _dbContext.Voivodeships.FirstOrDefault(v => v.Id == announcementDTO.VoivodeshipId);
            var pictureLocations = new List<PicturePath>();
            if (announcementDTO.PictureLocations != null)
            {
                foreach (var pictureLocation in announcementDTO.PictureLocations)
                {
                    pictureLocations.Add(new PicturePath
                    {
                        DirectoryName = pictureLocation.DirectoryName,
                        FileName = pictureLocation.FileName,
                    });
                }
            }

            var announcement = new Announcement
            {
                Id = Guid.NewGuid(),
                Title = announcementDTO.Title,
                Description = announcementDTO.Description,
                PublishDate = announcementDTO.PublishDate,
                PictureLocations = pictureLocations,
                Owner = owner,
                SubCategory = subCategory,
                City = city,    
                Voivodeship = voivodeship,
                PaymentType = announcementDTO.PaymentType,
                Price = announcementDTO.Price,
                OtherPaymentType = announcementDTO.OtherPaymentType,
            };
            await _dbContext.Set<Announcement>().AddAsync(announcement);
            await _dbContext.SaveChangesAsync();
            return announcement;
        }
    }
}
