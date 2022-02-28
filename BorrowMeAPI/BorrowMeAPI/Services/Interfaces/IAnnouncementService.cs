using BorrowMeAPI.Model.DataTransferObjects;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        // GET by ID
        Task<Announcement> GetAnnouncement(Guid announcementId);

        // GET by Filters
        Task<FilteredAnnoucementsDto> GetAnnouncements(string category, string voivodship, string city, 
            string search_phrase, int currentPage, int costMin, int costMax, string sortBy, string sortDirection);


        // POST
        Task<Announcement> AddAnnouncement(AnnouncementDTO announcementDTO);


        // PUT by ID
        Task<Announcement> UpdateAnnouncement(Announcement announcement);

        // PATCH by ID
        // TO DO

        // DELETE by ID
        Task<Announcement> DeleteAnnouncement(Guid id);




    }
}
