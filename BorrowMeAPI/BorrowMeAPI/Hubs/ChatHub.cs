using Microsoft.AspNetCore.SignalR;

namespace Api.Hubs
{
    namespace Api.Messaging
    {
        public class ChatHub : Hub
        {
            private readonly ILogger<ChatHub> _logger;

            public ChatHub(ILogger<ChatHub> logger)
            {
                _logger = logger;
            }
            public async Task SendMessage(string message)
            {
                _logger.LogInformation($"Received message: {message}");
                await Clients.All.SendAsync("ReceiveMessage", message);
            }
        }
    }

}
