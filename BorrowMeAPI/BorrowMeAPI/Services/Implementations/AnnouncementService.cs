using BorrowMeAPI.Model;
using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IRepository<Announcement> _repository;
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementService(IRepository<Announcement> repository, IAnnouncementRepository announcementRepository)
        {
            _repository = repository;
            _announcementRepository = announcementRepository;
        }

        public async Task<Announcement> AddAnnouncement(Announcement announcement)
        {
            return await _repository.Add(announcement);
        }

        public async Task<Announcement> DeleteAnnouncement(int id)
        {
            return await _repository.Delete(await _repository.GetById(id));
        }

        public async Task<Announcement> GetAnnouncement(int announcementId)
        {
            return await _repository.GetById(announcementId);
        }

        public async Task<FilteredAnnoucementsDto> GetAnnouncementByFilters(string category, string voivodship, string city, string search_phrase, int currentPage)
        {
            const float numberOfAnnoucementsPerPage = 4f;

            var filteredAnnoucements = await _announcementRepository.GetAnnouncementsByFilters(category, voivodship, city,search_phrase);

            var numberOfPages = Math.Ceiling(filteredAnnoucements.Count / numberOfAnnoucementsPerPage);


            if (filteredAnnoucements.Count == 0)
            {
                return new FilteredAnnoucementsDto
                {
                    Status = Status.NotFound
                };
            }
            if (currentPage > numberOfPages)
            {
                return new FilteredAnnoucementsDto
                {
                    Status = Status.BadRequest
                };
            }

            filteredAnnoucements = filteredAnnoucements
                .Skip(( currentPage - 1 ) * (int) numberOfAnnoucementsPerPage)
                .Take((int) numberOfAnnoucementsPerPage)
                .ToList();

            return new FilteredAnnoucementsDto
            {
                Status = Status.Ok,
                Announcements = filteredAnnoucements,
                NumberOfPages = (int)numberOfPages
            };
        }

        public async Task<IEnumerable<Announcement>> GetAnnouncements()
        {
            return await _announcementRepository.GetAllAnnouncements();
        }

        public async Task<Announcement> UpdateAnnouncement(Announcement announcement)
        {
            return await _repository.Edit(announcement);
        }
    }
}
