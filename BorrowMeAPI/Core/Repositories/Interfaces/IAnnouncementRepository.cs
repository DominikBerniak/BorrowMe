using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Repositories
{
    public interface IAnnouncementRepository : IRepository<Announcement>
    {
        Task<List<Announcement>> GetAnnouncementsByFilters(SearchedAnnouncementFilterDto searchFilter);
        Task<List<Announcement>> GetAllAnnouncements();
        Task<Announcement> AddNewAnnouncement(CreateAnnouncementDto announcementData, Announcement newAnnouncement);
        Task<Announcement> GetAnnouncementById(Guid announcementId);
        Task<List<Announcement>> GetUserAnnouncemntsWithLocation(Guid userId);
        Task<List<Announcement>> GetAnnouncementsByUserId(Guid userId);
    }
}