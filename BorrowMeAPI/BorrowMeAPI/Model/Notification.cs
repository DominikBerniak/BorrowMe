using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    [Table("product_availability_notification")]
    public class Notification
    {
        [Key]
        public Guid Id { get; set; }

        [Required, Column("product_name"), StringLength(100)]
        public string ProductName { get; set; }

        [Required, ForeignKey("user_id")]
        public User User { get; set; }

        [Required, ForeignKey("city_id")]
        public City City { get; set; }
    }
}
