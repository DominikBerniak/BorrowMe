using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services.Interfaces
{
    public interface IAnnouncementService
    {
        // GET by ID
        Task<Announcement> GetAnnouncement(Guid announcementId);

        Task<List<Announcement>> GetPromotedAnnouncements();

        // GET by Filters
        Task<FilteredAnnoucementsDto> GetAnnouncements(SearchedAnnouncementFilterDto searchFilter);


        // POST
        Task<CreateAnnouncementStatusDto> AddAnnouncement(CreateAnnouncementDto announcementData);


        // PUT by ID
        Task<Announcement> UpdateAnnouncement(Announcement announcement);

        // PATCH by ID
        // TO DO

        // DELETE by ID
        Task<Announcement> DeleteAnnouncement(Guid id);

        Task<List<Announcement>> GetAnnouncementsByUserId(Guid userId);
    }
}
