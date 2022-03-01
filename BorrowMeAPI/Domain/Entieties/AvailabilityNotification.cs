using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entieties
{
    public class AvailabilityNotification
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required, StringLength(100)]
        public string ProductName { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public City City { get; set; }
    }
}
