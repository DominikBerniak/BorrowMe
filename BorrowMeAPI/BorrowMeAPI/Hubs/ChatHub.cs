using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel.DataAnnotations;

namespace Api.Hubs
{
    namespace Api.Messaging
    {
        public class ChatHub : Hub
        {
            private readonly ILogger<ChatHub> _logger;
            private readonly IMessageService _messageService;

            public ChatHub(ILogger<ChatHub> logger, IMessageService messageService)
            {
                _logger = logger;
                _messageService = messageService;
            }

            public async Task SendMessageToUser(CreateMessageDTO messageData)
            {
                var results = new List<ValidationResult>();
                var context = new ValidationContext(messageData, null, null);
                if (!Validator.TryValidateObject(messageData, context, results))
                {
                    throw new HubException("Invalid message data!");
                }
                var createdMessage = await _messageService.AddMessage(messageData);
                if (createdMessage.Status == Status.BadRequest)
                {
                    throw new HubException("Invalid message data!");
                }
                _logger.LogInformation(
                    $"Received message: {createdMessage.Message.Text} from: {createdMessage.Message.Sender.Email} to: {createdMessage.Message.Receiver.Email}");
                await Clients.Users(createdMessage.Message.Sender.Email, createdMessage.Message.Receiver.Email).SendAsync("ReceivePrivateMessage", createdMessage.Message);
            }
        }
    }
}
