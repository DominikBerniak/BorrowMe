using BorrowMeAPI.Model.DataTransferObjects;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        // GET all
        Task<IEnumerable<Announcement>> GetAnnouncements();

        // GET by ID
        Task<Announcement> GetAnnouncement(Guid announcementId);

        // GET by Filters
        Task<FilteredAnnoucementsDto> GetAnnouncements(string category, string voivodship, string city, string search_phrase, int currentPage);


        // POST
        Task<Announcement> AddAnnouncement(Announcement announcement);


        // PUT by ID
        Task<Announcement> UpdateAnnouncement(Announcement announcement);

        // PATCH by ID
        // TO DO

        // DELETE by ID
        Task<Announcement> DeleteAnnouncement(Guid id);




    }
}
