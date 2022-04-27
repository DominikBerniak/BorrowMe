using Domain.Entieties;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Drawing;
using static System.Formats.Asn1.AsnWriter;

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
                HtmlContent =
                    "<div style=\"background-color: #e7e7e7; user-select: none; padding: 1rem 0 5rem 0;\">" +
                        "<h1 style=\"margin-top: 2rem; text-align: center;\">BorrowMe</h1>" +
                        "<div style=\"" +
                            "width: 45%; " +
                            "background-color: #fff; " +
                            "margin: 0 auto; " +
                            "border-radius: 1rem 1rem 1rem 1rem;\">" +
                            "<div style=\"" +
                                "padding: 0.5rem; " +
                                "text-align: center; " +
                                "border-bottom: 0.3rem solid #dee2e6; " +
                                "background-color: #676767; " +
                                "color: #fff; " +
                                "border-color: #2d2d2d; " +
                                "border-radius: 1rem 1rem 0 0; " +
                                "font-size: 1.5rem;\"> Potwierdzenie rejestracji</div>" +
                            "<div style=\"" +
                                "margin-top: 1.7rem; " +
                                "font-size: 1.3rem; " +
                                "padding: 0 1rem; " +
                                "text-align: center;\">Witaj w BorrowMe!</div>" +
                            "<div style=\"" +
                                "margin-top: 1rem; " +
                                "font-size: 1.3rem; " +
                                "padding: 0 1rem; " +
                                "text-align: center;\">Aby potwierdzić swój adres email kliknij w poniższy przycisk:</div>" +
                            $"<a href=\"{link}\" style=\"" +
                                "display: block; " +
                                "text-decoration: none; " +
                                "text-align: center; " +
                                "margin: 2rem auto 0 auto; " +
                                "cursor: pointer; " +
                                "background-color: #676767; " +
                                "color: #fff; " +
                                "font-size: 1.3rem; " +
                                "border-radius: 0.5rem; " +
                                "border: none; " +
                                "padding: 0.5rem; " +
                                "width: 50%; \">Potwierdź email</a>" +
                            "<div style=\"" +
                                "text-align: center; " +
                                "margin-top: 3rem; " +
                                "padding-bottom: 1.5rem; " +
                                "color: #6e6e6e;\">Jeśli to nie Ty zakładałeś konto w BorroMe, możesz zignorować tą wiadomość.</div>" +
                    "</div>" +
                "</div>"
            };
            msg.AddTo(new EmailAddress(email, email));
            await client.SendEmailAsync(msg);
        }

        public async Task SendResetPasswordEmail(string email, string token)
        {
            var apiKey = _configuration.GetSection("SendGridKey").GetSection("Key").Value;
            var client = new SendGridClient(apiKey);
            var clientUrl = _configuration.GetSection("Client").GetSection("Url").Value;
            string link = $"{clientUrl}/forgot-password-update?token={token}";
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("borrowmebot@gmail.com", "BorrowMe"),
                Subject = "Zresetuj swoje hasło BorrowMe",
                HtmlContent =
                    "<div style=\"background-color: #e7e7e7; user-select: none; padding: 1rem 0 5rem 0;\">" +
                        "<h1 style=\"margin-top: 2rem; text-align: center;\">BorrowMe</h1>" +
                        "<div style=\""+
                            "width: 45%; "+
                            "background-color: #fff; "+
                            "margin: 0 auto; "+
                            "border-radius: 1rem 1rem 1rem 1rem;\">"+
                            "<div style=\"" +
                                "padding: 0.5rem; "+
                                "text-align: center; "+
                                "border-bottom: 0.3rem solid #dee2e6; "+
                                "background-color: #676767; "+
                                "color: #fff; "+
                                "border-color: #2d2d2d; "+
                                "border-radius: 1rem 1rem 0 0; "+
                                "font-size: 1.5rem;\"> Resetowanie hasła</div>"+
                            "<div style=\"" +
                                "margin-top: 1.7rem; "+
                                "font-size: 1.3rem; "+
                                "padding: 0 1rem; " +
                                "text-align: center;\">Otrzymaliśmy prośbę o zresetowanie hasła Twojego konta BorrowMe.</div>" +
                            "<div style=\"" +
                                "margin-top: 1rem; " +
                                "font-size: 1.3rem; " +
                                "padding: 0 1rem; " +
                                "text-align: center;\">Kliknij poniższy przycisk aby zresetować hasło:</div>" +
                            $"<a href=\"{link}\" style=\"" +
                                "display: block; " +
                                "text-decoration: none; " +
                                "text-align: center; " +
                                "margin: 2rem auto 0 auto; " +
                                "cursor: pointer; " +
                                "background-color: #676767; " +
                                "color: #fff; " +
                                "font-size: 1.3rem; " +
                                "border-radius: 0.5rem; " +
                                "border: none; "+
                                "padding: 0.5rem; "+
                                "width: 50%; \">Resetuj hasło</a>"+
                            "<div style=\"" +
                                "text-align: center; "+
                                "margin-top: 3rem; " +
                                "padding-bottom: 1.5rem; " +
                                "color: #6e6e6e;\">Jeśli nie prosiłeś o zresetowanie hasła, możesz zignorować tą wiadomość.</div>"+
                    "</div>"+
                "</div>"
            };
            msg.AddTo(new EmailAddress(email, email));
            await client.SendEmailAsync(msg);
        }
    }
}
