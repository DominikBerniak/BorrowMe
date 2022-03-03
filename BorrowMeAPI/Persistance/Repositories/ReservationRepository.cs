using Core.Model.DataTransferObjects;
using Core.Repositories.Interfaces;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly DataDbContext _dbContext;

    public ReservationRepository(DataDbContext dbContext)
    {
        _dbContext = dbContext;
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

    public async Task<Reservation> AddNewReservation(ReservationDto reservationDto)
    {
        var user = _dbContext.Users.FirstOrDefault(user => user.Id == reservationDto.UserId);
        var announcement = _dbContext.Announcements.FirstOrDefault(ann => ann.Id == reservationDto.AnnouncementId);

        var reservation = new Reservation()
        {
            Id = Guid.NewGuid(),
            User = user,
            Announcement = announcement,
            ReservationStartDay = reservationDto.StartDate,
            ReservationEndDay = reservationDto.EndDate
        };

        await _dbContext.Set<Reservation>().AddAsync(reservation);
        await _dbContext.SaveChangesAsync();
        return reservation;
    }
}