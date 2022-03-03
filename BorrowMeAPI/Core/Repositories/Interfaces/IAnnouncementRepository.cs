﻿using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Repositories
{
    public interface IAnnouncementRepository
    {
        Task<List<Announcement>> GetAnnouncementsByFilters(string category, string voivodeship, string city, 
            string searchPhrase, int costMin, int costMax, string sortBy, string sortDirection);
        Task<List<Announcement>> GetAllAnnouncements();
        Task<Announcement> AddNewAnnouncement(AnnouncementDTO announcementDTO);
        Task<Announcement> GetAnnouncementById(Guid announcementId);
    }
}