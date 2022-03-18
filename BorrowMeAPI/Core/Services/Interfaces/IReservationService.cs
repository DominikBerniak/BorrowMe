using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services
{
    public interface IReservationService
    {
        Task<List<Reservation>> GetByUserId(Guid id);

        Task<List<Reservation>> GetByAnnouncementId(Guid id);

        Task<Reservation> GetReservationById(Guid id);
        // POST
        Task<Reservation> AddReservation(CreateReservationDto reservation);

        // DELETE
        Task<Reservation> DeleteReservation(Guid id);
        
        // PATCH
        Task<Reservation> UpdateIsAcceptedReservation(Guid id, bool isAccepted);
    }
}
