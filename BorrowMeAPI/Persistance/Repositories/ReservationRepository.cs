using Core.Model.DataTransferObjects;
using Core.Repositories.Interfaces;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories;

public class ReservationRepository : Repository<Reservation>, IReservationRepository
{
    public ReservationRepository(DataDbContext dbContext)
        : base(dbContext)
    {
    }

    public async Task<List<Reservation>> GetReservationsByUserId(Guid id)
    {
        var reservations = _dbContext.Reservations
            .Include(r => r.User)
            .Include(r => r.Announcement)
            .AsQueryable();
        return await reservations.Where(r => r.User.Id == id).ToListAsync();
    }

    public async Task<List<Reservation>> GetReservationsByAnnouncementId(Guid id)
    {
        var reservations = _dbContext.Reservations
            .Include(r => r.User)
            .Include(r => r.Announcement)
            .AsQueryable();
        return await reservations.Where(r => r.Announcement.Id == id).ToListAsync();
    }

    public async Task<Reservation> AddNewReservation(CreateReservationDto reservationDto)
    {
        var user = await _dbContext.Users.FindAsync(reservationDto.UserId);
        var announcement = await _dbContext.Announcements.FindAsync(reservationDto.AnnouncementId);

        var reservation = new Reservation()
        {
            Id = Guid.NewGuid(),
            User = user,
            Announcement = announcement,
            ReservationStartDay = reservationDto.StartDate,
            ReservationEndDay = reservationDto.EndDate
        };

        await _dbContext.Reservations.AddAsync(reservation);
        await _dbContext.SaveChangesAsync();
        return reservation;
    }

    public async Task<Reservation> GetReservationsById(Guid id)
    {
        var reservations = _dbContext.Reservations
            .Include(r => r.User)
            .Include(r => r.Announcement)
            .AsQueryable();
        reservations = reservations.Where(r => r.Id == id);
        return await reservations.FirstOrDefaultAsync();
    }
}