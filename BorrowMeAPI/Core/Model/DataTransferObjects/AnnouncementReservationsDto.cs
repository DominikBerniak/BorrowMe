using Domain.Entieties;

namespace Core.Model.DataTransferObjects;

public class AnnouncementReservationsDto
{
    public Announcement Announcement { get; set; }
    public List<Reservation> Reservations { get; set; }
}