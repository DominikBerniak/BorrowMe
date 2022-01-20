using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services
{
    public interface IReservationService
    {
        // POST
        void AddReservation(Guid announcementId, Reservation reservation);

        // DELETE
        void DeleteReservation(Guid announcementId, Reservation reservation);
    }
}
