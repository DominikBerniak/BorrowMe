using Core.Model.DataTransferObjects;
using Core.Repositories;
using Core.Services.Interfaces;
using Domain.Entieties;

namespace Services.Implementations
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IRepository<Announcement> _repository;
        private readonly IAnnouncementRepository _announcementRepository;
        private readonly IRepository<User> _userRepository;

        public AnnouncementService(IRepository<Announcement> repository, IAnnouncementRepository announcementRepository,
                                    IRepository<User> userRepository)
        {
            _repository = repository;
            _announcementRepository = announcementRepository;
            _userRepository = userRepository;
        }

        public async Task<Announcement> AddAnnouncement(AnnouncementDTO announcementDTO)
        {
            return await _announcementRepository.AddNewAnnouncement(announcementDTO);
        }

        public async Task<Announcement> DeleteAnnouncement(Guid id)
        {
            return await _repository.Delete(await _repository.GetById(id));
        }

        public async Task<Announcement> GetAnnouncement(Guid announcementId)
        {
            //return await _repository.GetById(announcementId);
            return await _announcementRepository.GetAnnouncementById(announcementId);
        }

        public async Task<FilteredAnnoucementsDto> GetAnnouncements(string category, string voivodship, 
            string city, string search_phrase, int currentPage, int costMin, int costMax, string sortBy, string sortDirection)
        {
            const float numberOfAnnoucementsPerPage = 2f;

            var filteredAnnoucements = await _announcementRepository.GetAnnouncementsByFilters(category, voivodship, city, search_phrase, costMin, costMax, sortBy, sortDirection);

            var numberOfPages = Math.Ceiling(filteredAnnoucements.Count / numberOfAnnoucementsPerPage);


            if (filteredAnnoucements.Count == 0)
            {
                return new FilteredAnnoucementsDto
                {
                    Status = Status.NotFound
                };
            }
            if (currentPage > numberOfPages || currentPage < 1)
            {
                return new FilteredAnnoucementsDto
                {
                    Status = Status.BadRequest,
                    NumberOfPages = (int)numberOfPages
                };
            }
            filteredAnnoucements = filteredAnnoucements
            .Skip((int) ( currentPage - 1 ) * (int) numberOfAnnoucementsPerPage)
            .Take((int) numberOfAnnoucementsPerPage)
            .ToList();

            return new FilteredAnnoucementsDto
            {
                Status = Status.Ok,
                Announcements = filteredAnnoucements,
                NumberOfPages = (int) numberOfPages
            };
        }

        public async Task<IEnumerable<Announcement>> GetAnnouncements()
        {
            return await _announcementRepository.GetAllAnnouncements();
        }

        public async Task<List<Announcement>> GetPromotedAnnouncements()
        {
            //na potrzeby demo
            var announcements = await _announcementRepository.GetAllAnnouncements();
            return announcements.Take(4).ToList();
        }

        public async Task<Announcement> UpdateAnnouncement(Announcement announcement)
        {
            return await _repository.Edit(announcement);
        }
    }
}
