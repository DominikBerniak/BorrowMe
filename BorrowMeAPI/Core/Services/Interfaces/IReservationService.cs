using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services
{
    public interface IReservationService
    {
        Task<List<Reservation>> GetByUserId(Guid id);

        Task<List<Reservation>> GetByAnnouncementId(Guid id);
        // POST
        void AddReservation(ReservationDto reservation);

        // DELETE
        void DeleteReservation(Guid id);
    }
}
