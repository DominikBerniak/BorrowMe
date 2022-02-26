﻿using BorrowMeAPI.Repositories;
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

        public async Task<Announcement> DeleteAnnouncement(Guid id)
        {
            return await _repository.Delete(await _repository.GetById(id));
        }

        public async Task<Announcement> GetAnnouncement(Guid announcementId)
        {
            return await _repository.GetById(announcementId);
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

        public async Task<Announcement> UpdateAnnouncement(Announcement announcement)
        {
            return await _repository.Edit(announcement);
        }
    }
}
