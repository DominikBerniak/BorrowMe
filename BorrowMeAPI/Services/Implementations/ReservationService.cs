using Core.Model.DataTransferObjects;
using Core.Repositories;
using Core.Repositories.Interfaces;
using Core.Services;
using Domain.Entieties;

namespace Services.Implementations
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;

        public ReservationService(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        public async Task<List<Reservation>> GetByUserId(Guid id)
        {
            return await _reservationRepository.GetReservationsByUserId(id);
        }

        public async Task<List<Reservation>> GetByAnnouncementId(Guid id)
        {
            return await _reservationRepository.GetReservationsByAnnouncementId(id);
        }

        public async Task<Reservation> GetReservationById(Guid id)
        {
            return await _reservationRepository.GetReservationsById(id);
        }

        public async Task<Reservation> AddReservation(CreateReservationDto reservation)
        {
            return await _reservationRepository.AddNewReservation(reservation);
        }

        public async Task<Reservation> DeleteReservation(Guid id)
        {
            return await _reservationRepository.Delete(await _reservationRepository.GetById(id));
        }
    }
}
