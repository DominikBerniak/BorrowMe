using Domain.Entieties;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Model.DataTransferObjects;

public class CreateReservationDto
{
    [Required]
    public Guid AnnouncementId { get; set; }
    [Required]
    public Guid UserId { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    [Required]
    public DateTime EndDate { get; set; }

    public override string ToString()
    {
        return $"{AnnouncementId}, {UserId}, {StartDate.ToString()}, {EndDate.ToString()}";
    }
}

public class GetReservationDto
{
    public Guid Id { get; set; }
    public DateTime ReservationStartDay { get; set; }
    public DateTime ReservationEndDay { get; set; }
    public bool IsAccepted { get; set; } = false;
    public User User { get; set; }
    public Announcement Announcement { get; set; }
}