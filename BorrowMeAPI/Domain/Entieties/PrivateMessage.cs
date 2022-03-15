using System.ComponentModel.DataAnnotations;

namespace Domain.Entieties
{
    public class PrivateMessage
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required, StringLength(500)]
        public string Text { get; set; }
        [Required]
        public User Sender { get; set; }
        [Required]
        public User Receiver { get; set; }
        public DateTime SendTime { get; set; } = DateTime.Now;
        [Required]
        public bool IsRead { get; set; } = false;
    }
}
