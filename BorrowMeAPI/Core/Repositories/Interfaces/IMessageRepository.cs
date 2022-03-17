using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Repositories.Interfaces
{
    public interface IMessageRepository : IRepository<Message>
    {
        Task<Message> AddMessage(CreateMessageDTO messageData, Message message);
        Task<List<Message>> GetReservationMessages(Guid reservationId);
    }
}
