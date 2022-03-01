using Domain.Entieties;

namespace Core.Services
{
    public interface IReservationService
    {
        // POST
        void AddReservation(int announcementId, Reservation reservation);

        // DELETE
        void DeleteReservation(int announcementId, Reservation reservation);
    }
}
