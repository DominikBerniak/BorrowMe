using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services
{
    public interface IReservationService
    {
        Task<List<Reservation>> GetByUserId(Guid id);

        Task<List<Reservation>> GetByAnnouncementId(Guid id);
        // POST
        Task<Reservation> AddReservation(ReservationDto reservation);

        // DELETE
        Task<Reservation> DeleteReservation(Guid id);
    }
}
