using AutoMapper;
using Core.Model.DataTransferObjects;
using Core.Repositories.Interfaces;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories
{
    public class MessageRepository : Repository<Message>, IMessageRepository
    {
        public MessageRepository(DataDbContext dbContext)
            : base(dbContext)
        {
        }
        public async Task<Message> AddMessage(CreateMessageDTO messageData, Message message)
        {
            var sender = await _dbContext.Users.FindAsync(messageData.SenderId);
            var receiver = await _dbContext.Users.FindAsync(messageData.ReceiverId);
            var reservation = await _dbContext.Reservations.FindAsync(messageData.ReservationId);
            message.Sender = sender;
            message.Receiver = receiver;
            message.Reservation = reservation;
            await _dbContext.Messages.AddAsync(message);
            await _dbContext.SaveChangesAsync();
            return message;
        }

        public async Task<List<Message>> GetReservationMessages(Guid reservationId)
        {
            var messages = await _dbContext.Messages
                .Where(m => m.Reservation.Id == reservationId)
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .OrderBy(m=>m.SendTime)
                .ToListAsync();
            return messages;
        }
    }
}
