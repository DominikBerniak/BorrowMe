using BorrowMeAPI.Model;
using BorrowMeAPI.Model.DataTransferObjects;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface IAnnouncementService
    {
        // GET all
        IEnumerable<Announcement> GetAnnouncements();

        // GET by ID
        Announcement GetAnnouncement(int announcementId);

        // GET by Filters
        Task<FilteredAnnoucementsDto> GetAnnouncementByFilters(string category, string voivodship, string city, string search_phrase, int currentPage);


        // POST
        Task<Announcement> AddAnnouncement(Announcement announcement);


        // PUT by ID
        void UpdateAnnouncement(Announcement announcement);

        // PATCH by ID
        // TO DO

        // DELETE by ID
        void DeleteAnnouncement(int id);




    }
}
