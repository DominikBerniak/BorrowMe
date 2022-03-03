using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entieties
{
    public class Reservation : EntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime ReservationStartDay { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime ReservationEndDay { get; set; }
        [Required]
        public bool IsAccepted { get; set; } = false;
        [Required]
        public User User { get; set; }
        [Required]
        public Announcement Announcement { get; set; }
    }
}
