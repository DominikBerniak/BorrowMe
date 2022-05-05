
using Domain.Entieties;

namespace Services.Implementations
{
    public interface IEmailService
    {
        Task SendConfirmationEmail(string userId, string email, string token);
        Task SendResetPasswordEmail(string email, string token);
        Task SendReservationConfirmationEmail(Reservation reservation);
    }
}