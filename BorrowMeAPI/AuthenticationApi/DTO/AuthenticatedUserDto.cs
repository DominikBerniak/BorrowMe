using System.ComponentModel.DataAnnotations;

namespace BorrowMeAuth.DTO
{
    public class AuthenticatedUserDto
    {
        public string BusinessUserId { get; set; }
        public List<string> Roles { get; set; }
    }

    public class ResetPasswordDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [Required]
        [StringLength(20, ErrorMessage = "Your password is limited to {2} to {1} characters", MinimumLength = 5)]
        public string NewPassword { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
