using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services.Interfaces
{
    public interface IMessageService
    {
        Task<CreateMessageStatusDTO> AddMessage(CreateMessageDTO messageData);
        Task<GetPaginatedMessagesDto> GetPaginatedReservationMessages(Guid reservationId, int pageNumber);
        Task<GetMessageDTO> SetMessageAsRead(Guid id);
    }
}
