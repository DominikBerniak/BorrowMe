using BorrowMeAPI.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    public class Reservation
    {
        [Required, DataType(DataType.Date), Column("reservation_day")]
        public DateTime ReservationDay { get; set; }

        [Required, Column("is_accepted")]
        public bool IsAccepted { get; set; }

        [Required, ForeignKey("user_id")]
        public User User { get; set; }

        [Required, ForeignKey("announcement_id")]
        public Announcement Announcement { get; set; }
    }
}
