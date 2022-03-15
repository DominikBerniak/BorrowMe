using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

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
            //public async Task SendMessage(string message, string connectionId)
            //{
            //    _logger.LogInformation($"Received message: {message} from id: {connectionId}");
            //    await Clients.User(connectionId).SendAsync(message);
            //    //await Clients.All.SendAsync("ReceiveMessage", message);
            //}

            public async Task SendMessage(string message, string receiver)
            {
                //_logger.LogInformation($"Received message: {message} from id: {receiver}");
                var user = Context.User.FindFirst(ClaimTypes.Email);
                _logger.LogInformation($"Received message: {message} from: {user}");
                await Clients.User(receiver).SendAsync("ReceiveMessage", message);
            }

            public string GetConnectionId() => Context.ConnectionId;

            //public override async Task OnConnectedAsync()
            //{
            //    foreach (var claim in Context.User.Claims)
            //    {
            //        _logger.LogInformation($"user with claim: {claim}");
            //    }
            //    //_logger.LogInformation($"user {Context.User.Claims} joined.");
            //    await Clients.All.SendAsync("ReceiveSystemMessage",
            //                        $"{Context.UserIdentifier} joined.");

            //    await base.OnConnectedAsync();
            //}
        }
    }
}
