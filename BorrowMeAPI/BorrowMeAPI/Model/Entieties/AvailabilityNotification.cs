using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
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
