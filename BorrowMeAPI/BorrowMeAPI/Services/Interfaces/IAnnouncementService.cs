using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        // GET all
        IEnumerable<Announcement> GetAnnouncements();

        // GET by ID
        Announcement GetAnnouncement(int announcementId);

        // GET by Filters
        Announcement GetAnnouncementByFilters(string category, string voivodship, string city, string search_phrase);


        // POST
        void AddAnnouncement(Announcement announcement);


        // PUT by ID
        void UpdateAnnouncement(Announcement announcement);

        // PATCH by ID
        // TO DO

        // DELETE by ID
        void DeleteAnnouncement(int id);




    }
}
