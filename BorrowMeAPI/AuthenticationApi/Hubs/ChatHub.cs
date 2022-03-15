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

            public async Task SendMessageToUser(string message, string receiver)
            {
                var sender = Context.UserIdentifier;
                _logger.LogInformation($"Received message: {message} from: {sender} to: {receiver}");
                await Clients.User(receiver).SendAsync("ReceiveMessage", message);
            }
        }
    }
}
