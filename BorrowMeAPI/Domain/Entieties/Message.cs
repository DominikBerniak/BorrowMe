using System.ComponentModel.DataAnnotations;

namespace Domain.Entieties
{
    public class Message : EntityBase
    {
        [Key]
        public Guid Id { get; set; }
        [Required, StringLength(500)]
        public string Text { get; set; }
        [Required]
        public User Sender { get; set; }
        [Required]
        public User Receiver { get; set; }
        [Required]
        public Reservation Reservation { get; set; }
        public DateTime SendTime { get; set; }
        [Required]
        public bool IsRead { get; set; }
    }
}
