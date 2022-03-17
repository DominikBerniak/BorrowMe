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
        return await _dbContext.Reservations
            .Where(r => r.User.Id == id)
            .Include(r => r.User)
            .Include(r => r.Announcement)
            .ToListAsync();
    }

    public async Task<List<Reservation>> GetReservationsByUserIdIncludeAnnouncementLocation(Guid id)
    {
        return await _dbContext.Reservations
            .Where(r => r.User.Id == id)
            .Include(r => r.Announcement)
                .ThenInclude(a=>a.Owner.PictureLocation)
            .Include(r => r.Announcement)
                .ThenInclude(a => a.City)
            .Include(r => r.Announcement)
                .ThenInclude(a => a.Voivodeship)
            .ToListAsync();
    }

    public async Task<List<Reservation>> GetReservationsByAnnouncementId(Guid id)
    {
        return await _dbContext.Reservations
            .Where(r => r.Announcement.Id == id)
            .Include(r => r.User)
            .Include(r => r.Announcement)
            .ToListAsync();
    }

    public async Task<List<Reservation>> GetReservationsByAnnouncementIdIncludeUser(Guid announcementId)
    {
        return await _dbContext.Reservations
            .Where(r => r.Announcement.Id == announcementId)
            .Include(r => r.User.PictureLocation)
            .ToListAsync();
    }

    public async Task<Reservation> AddNewReservation(CreateReservationDto reservationDto)
    {
        var user = await _dbContext.Users.FindAsync(reservationDto.UserId);
        var announcement = await _dbContext.Announcements.Where(a => a.Id == reservationDto.AnnouncementId)
            .Include(a => a.Owner)
            .FirstOrDefaultAsync();

        var reservation = new Reservation()
        {
            Id = Guid.NewGuid(),
            User = user,
            Announcement = announcement,
            ReservationStartDay = TimeZoneInfo.ConvertTimeFromUtc(reservationDto.StartDate, TimeZoneInfo.Local),
            ReservationEndDay = TimeZoneInfo.ConvertTimeFromUtc(reservationDto.EndDate, TimeZoneInfo.Local)
        };

        await _dbContext.Reservations.AddAsync(reservation);
        await _dbContext.SaveChangesAsync();
        return reservation;
    }

    public async Task<Reservation> GetReservationById(Guid id)
    {
        return await _dbContext.Reservations.Where(r => r.Id == id)
            .Include(r => r.User)
            .Include(r => r.Announcement)
            .ThenInclude(a=>a.Owner)
            .FirstOrDefaultAsync();
    }
}