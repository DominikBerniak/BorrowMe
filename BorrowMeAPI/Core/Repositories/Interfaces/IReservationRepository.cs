using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Repositories.Interfaces;

public interface IReservationRepository : IRepository<Reservation>
{
    Task<List<Reservation>> GetReservationsByUserId(Guid id);
    Task<List<Reservation>> GetReservationsByUserIdIncludeAnnouncementLocation(Guid id);
    Task<List<Reservation>> GetReservationsByAnnouncementId(Guid id);
    Task<List<Reservation>> GetReservationsByAnnouncementIdIncludeUser(Guid announcementId);
    Task<Reservation> AddNewReservation(CreateReservationDto reservationDto);
    Task<Reservation> GetReservationById(Guid id);
    Task<Reservation> UpdateIsAcceptedReservation(Guid id, bool isAccepted);
}