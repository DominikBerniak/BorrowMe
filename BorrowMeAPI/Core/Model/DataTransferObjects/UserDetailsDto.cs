using Domain.Entieties;

namespace Core.Model.DataTransferObjects;

public class UserDetailsDto
{
    public User User { get; set; }
    public List<Reservation> Reservations { get; set; }
    public List<Announcement> Announcements { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public PicturePath? PictureLocation { get; set; }
    public int ReputationPoints { get; set; } = 0;
}