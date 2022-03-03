namespace BorrowMeAuth.DTO
{
    public class AuthenticatedUserDto
    {
        public string BusinessUserId { get; set; }
        public List<string> Roles { get; set; }
    }
}
