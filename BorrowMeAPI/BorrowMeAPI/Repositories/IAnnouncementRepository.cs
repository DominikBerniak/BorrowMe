﻿
namespace BorrowMeAPI.Repositories
{
    public interface IAnnouncementRepository
    {
        Task<List<Announcement>> GetAnnouncementsByFilters(string category, string voivodeship, string city, string searchPhrase);
        Task<List<Announcement>> GetAllAnnouncements();
    }
}