using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<Announcement> GetAnnouncement(Guid announcementId);

        Task<List<Announcement>> GetPromotedAnnouncements();

        Task<FilteredAnnoucementsDto> GetAnnouncements(SearchedAnnouncementFilterDto searchFilter);

        Task<CreateAnnouncementStatusDto> AddAnnouncement(CreateAnnouncementDto announcementData);

        Task<Announcement> UpdateAnnouncement(CreateAnnouncementDto announcementData, Guid announcementId);
        Task<Announcement> DeleteAnnouncement(Guid id);

        Task<List<Announcement>> GetAnnouncementsByUserId(Guid userId);
    }
}
