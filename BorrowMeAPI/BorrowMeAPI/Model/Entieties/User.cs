using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50), Column("first_name")]
        public string FirstName { get; set; }

        [Required, StringLength(50), Column("last_name")]
        public string LastName { get; set; }

        [Required, StringLength(60)]
        public string Email { get; set; }

        [StringLength(15), Column("phone_number")]
        public string PhoneNumber { get; set; }

        [StringLength(80), Column("picture_path")]
        public string PicturePath { get; set; }

        [Required, Column("reputation_points")]
        public int ReputationPoints { get; set; }
    }
}
