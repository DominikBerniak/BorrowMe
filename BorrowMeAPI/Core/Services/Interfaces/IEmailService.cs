
namespace Services.Implementations
{
    public interface IEmailService
    {
        Task SendConfirmationEmail(string userId, string email, string token);
    }
}