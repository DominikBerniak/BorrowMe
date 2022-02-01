using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services
{
    public interface IAnnouncementService
    {
        // GET all
        IEnumerable<Announcement> GetAnnouncements();

        // GET by ID
        Announcement GetAnnouncement(Guid announcementId);

        // GET by Filters
        Announcement GetAnnouncementByFilters(string category, string voivodship, string city, string search_phrase);


        // POST
        void AddAnnouncement();


        // PUT by ID
        void UpdateAnnouncement(Guid id, Announcement announcement);

        // PATCH by ID
        // TO DO

        // DELETE by ID
        void DeleteAnnouncement(Guid id);


        

    }
}
