namespace Core.Model.DataTransferObjects;

public class ReservationDto
{
    public Guid AnnouncementId { get; set; }
    public Guid UserId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}