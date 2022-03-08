using Domain.Entieties;

namespace Core.Model.DataTransferObjects
{
    public class CreateUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
    public class GetUserDto : CreateUserDto
    {
        public Guid Id { get; set; }
        public string? PhoneNumber { get; set; }
        public PicturePath? PictureLocation { get; set; }
        public int ReputationPoints { get; set; } = 0;
    }
}
