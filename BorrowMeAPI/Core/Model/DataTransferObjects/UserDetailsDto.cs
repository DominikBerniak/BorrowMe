using Domain.Entieties;

namespace Core.Model.DataTransferObjects;

public class UserDetailsDto
{
    public User User { get; set; }
    public List<Announcement> Announcements { get; set; }
}