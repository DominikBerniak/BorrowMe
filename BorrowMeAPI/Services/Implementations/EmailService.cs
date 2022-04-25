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
                    "<div style=\"background-color: #e7e7e7; user-select: none; padding: 1px 0 20px 0;\">" +
                        "<h1 style=\"margin-top: 30px; text-align: center;\">BorrowMe</h1>" +
                        "<div style=\"" +
                            "width: 40%; " +
                            "background-color: #fff; " +
                            "margin: 20px auto 20px auto; " +
                            "border-radius: 15px 15px 15px 15px;\">" +
                            "<div style=\"" +
                                "padding: 10px; " +
                                "text-align: center; " +
                                "border-bottom: 5px solid #dee2e6; " +
                                "background-color: #676767; " +
                                "color: #fff; " +
                                "border-color: #2d2d2d; " +
                                "border-radius: 15px 15px 0 0; " +
                                "font-size: 24px;\"> Potwierdzenie rejestracji</div>" +
                            "<div style=\"" +
                                "margin-top: 30px; " +
                                "font-size: 20px; " +
                                "text-align: center;\">Witaj w BorrowMe!</div>" +
                            "<div style=\"" +
                                "margin-top: 20px; " +
                                "font-size: 20px; " +
                                "text-align: center;\">Aby potwierdzić swój adres email klinij w poniższy przycisk:</div>" +
                            $"<a href=\"{link}\" style=\"" +
                                "display: block; " +
                                "text-decoration: none; " +
                                "text-align: center; " +
                                "margin: 30px auto 0 auto; " +
                                "cursor: pointer; " +
                                "background-color: #676767; " +
                                "color: #fff; " +
                                "font-size: 20px; " +
                                "border-radius: 7px; " +
                                "border: none; " +
                                "padding: 10px; " +
                                "width: 250px; \">Potwierdź email</a>" +
                            "<div style=\"" +
                                "text-align: center; " +
                                "margin-top: 50px; " +
                                "padding-bottom: 25px; " +
                                "color: #6e6e6e;\">Jeśli to nie Ty zakładałeś konto BorroMe, możesz zignorować tą wiadomość.</div>" +
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
                    "<div style=\"background-color: #e7e7e7; user-select: none; padding: 1px 0 20px 0;\">" +
                        "<h1 style=\"margin-top: 30px; text-align: center;\">BorrowMe</h1>" +
                        "<div style=\""+
                            "width: 40%; "+
                            "background-color: #fff; "+
                            "margin: 20px auto 20px auto; "+
                            "border-radius: 15px 15px 15px 15px;\">"+
                            "<div style=\"" +
                                "padding: 10px; "+
                                "text-align: center; "+
                                "border-bottom: 5px solid #dee2e6; "+
                                "background-color: #676767; "+
                                "color: #fff; "+
                                "border-color: #2d2d2d; "+
                                "border-radius: 15px 15px 0 0; "+
                                "font-size: 24px;\"> Resetowanie hasła</div>"+
                            "<div style=\"" +
                                "margin-top: 30px; "+
                                "font-size: 20px; "+
                                "text-align: center;\">Otrzymaliśmy prośbę o zresetowanie hasła Twojego konta BorrowMe.</div>"+
                            "<div style=\"" +
                                "margin-top: 20px; " +
                                "font-size: 20px; "+
                                "text-align: center;\">Kliknij poniższy przycisk aby zresetować hasło:</div>" +
                            $"<a href=\"{link}\" style=\"" +
                                "display: block; " +
                                "text-decoration: none; " +
                                "text-align: center; " +
                                "margin: 30px auto 0 auto; " +
                                "cursor: pointer; " +
                                "background-color: #676767; " +
                                "color: #fff; " +
                                "font-size: 20px; "+
                                "border-radius: 7px; " +
                                "border: none; "+
                                "padding: 10px; "+
                                "width: 250px; \">Resetuj hasło</a>"+
                            "<div style=\"" +
                                "text-align: center; "+
                                "margin-top: 50px; " +
                                "padding-bottom: 25px; " +
                                "color: #6e6e6e;\">Jeśli nie prosiłeś o zresetowanie hasła, możesz zignorować tą wiadomość.</div>"+
                    "</div>"+
                "</div>"
            };
            msg.AddTo(new EmailAddress(email, email));
            await client.SendEmailAsync(msg);
        }
    }
}
