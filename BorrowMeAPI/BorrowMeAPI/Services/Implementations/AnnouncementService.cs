using BorrowMeAPI.Model;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IRepository<Announcement> _repository;
        public AnnouncementService(IRepository<Announcement> repository)
        {
            _repository = repository;
        }

        public void AddAnnouncement(Announcement announcement)
        {
            _repository.Add(announcement);
        }

        public void DeleteAnnouncement(int id)
        {
            _repository.Delete(_repository.GetById(id));
        }

        public Announcement GetAnnouncement(int announcementId)
        {
            return _repository.GetById(announcementId);
        }

        public Announcement GetAnnouncementByFilters(string category, string voivodship, string city, string search_phrase)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Announcement> GetAnnouncements()
        {
            return _repository.GetAll();
        }

        public void UpdateAnnouncement(Announcement announcement)
        {
            _repository.Edit(announcement);
        }
    }
}
