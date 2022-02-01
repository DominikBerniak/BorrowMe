using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Implementations
{
    public class AnnouncementService : IAnnouncementService
    {
        public void AddAnnouncement()
        {
            throw new NotImplementedException();
        }

        public void DeleteAnnouncement(Guid id)
        {
            throw new NotImplementedException();
        }

        public Announcement GetAnnouncement(Guid announcementId)
        {
            throw new NotImplementedException();
        }

        public Announcement GetAnnouncementByFilters(string category, string voivodship, string city, string search_phrase)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Announcement> GetAnnouncements()
        {
            throw new NotImplementedException();
        }

        public void UpdateAnnouncement(Guid id, Announcement announcement)
        {
            throw new NotImplementedException();
        }
    }
}
