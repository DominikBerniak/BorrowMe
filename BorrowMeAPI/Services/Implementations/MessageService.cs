using AutoMapper;
using Core.Model.DataTransferObjects;
using Core.Repositories.Interfaces;
using Core.Services.Interfaces;
using Domain.Entieties;

namespace Services.Implementations
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _repository;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<CreateMessageStatusDTO> AddMessage(CreateMessageDTO messageData)
        {
            var newMessage = new Message
            {
                Id = messageData.Id,
                Text = messageData.Text,
                SendTime = messageData.SendTime,
                IsRead = messageData.IsRead
            };
            var createdMessage = await _repository.AddMessage(messageData, newMessage);
            return new CreateMessageStatusDTO
            {
                Message = _mapper.Map<GetMessageDTO>(createdMessage),
                Status = Status.Created,
                StatusMessage = "Successfully added new message"
            };
        }

        public async Task<GetPaginatedMessagesDto> GetPaginatedReservationMessages(Guid reservationId, int pageNumber)
        {
            const float numberOfMessagesPerPage = 40f;
            var messages = await _repository.GetReservationMessages(reservationId);
            var numberOfPages = Math.Ceiling(messages.Count / numberOfMessagesPerPage);
            messages = messages
                .Skip(( pageNumber - 1 ) * (int) numberOfMessagesPerPage)
                .Take((int) numberOfMessagesPerPage)
                .ToList();
            var paginatedMessages = _mapper.Map<List<GetMessageDTO>>(messages);
            return new GetPaginatedMessagesDto
            {
                Messages = paginatedMessages,
                ReservationId = reservationId,
                CurrentPage = pageNumber,
                NumberOfPages = (int) numberOfPages
            };
        }

        public async Task<GetMessageDTO> SetMessageAsRead(Guid id)
        {
            var message = await _repository.GetById(id);
            if (message is null)
            {
                return null;
            }
            message.IsRead = true;
            await _repository.Edit(message);
            return _mapper.Map<GetMessageDTO>(message);
        }
    }
}
