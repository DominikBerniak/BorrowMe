using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Services.Implementations
{
    public class EmailService : IEmailService
    {
        public EmailService(ILogger<EmailService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public ILogger<EmailService> _logger { get; }
        public IConfiguration _configuration { get; }

        public async Task SendConfirmationEmail(string userId, string email, string token)
        {
            var apiKey = _configuration.GetSection("SendGridKey").GetSection("Key").Value;
            var client = new SendGridClient(apiKey);
            string link = $"https://localhost:7246/authentication/ConfirmEmail?userId={userId}&token={token}";
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("borrowmebot@gmail.com", "BorrowMe"),
                Subject = "Potwierdź adres email",
                HtmlContent = $"Kliknij w podany link aby potwierdzić adres email.\n <a href=\"{link}\">Link</a>"
            };
            msg.AddTo(new EmailAddress(email, email));
            await client.SendEmailAsync(msg);
        }
    }
}
