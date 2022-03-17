using Domain.Entieties;
using System.ComponentModel.DataAnnotations;

namespace Core.Model.DataTransferObjects
{
    public class GetMessageDTO
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public MessageUserDto Sender { get; set; }
        public MessageUserDto Receiver { get; set; }
        public DateTime SendTime { get; set; }
        public bool IsRead { get; set; }
    }

    public class GetPaginatedMessagesDto
    {
        public List<GetMessageDTO> Messages { get; set; }
        public Guid ReservationId { get; set; }
        public int CurrentPage { get; set; }
        public int NumberOfPages { get; set; }
    }

    public class CreateMessageDTO
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required, StringLength(500)]
        public string Text { get; set; }
        [Required]
        public Guid SenderId { get; set; }
        [Required]
        public Guid ReceiverId { get; set; }
        [Required]
        public Guid ReservationId { get; set; }
        public DateTime SendTime { get; set; } = DateTime.Now;
        [Required]
        public bool IsRead { get; set; } = false;
    }
    public class CreateMessageStatusDTO
    {
        public GetMessageDTO Message { get; set; }
        public Status Status { get; set; }
        public string StatusMessage { get; set; }
    }
    public class MessageUserDto : CreateUserDto
    {
        public Guid Id { get; set; }
    }
}
