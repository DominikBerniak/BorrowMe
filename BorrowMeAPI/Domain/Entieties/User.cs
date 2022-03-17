using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entieties
{
    public class User : EntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required, StringLength(50)]
        public string FirstName { get; set; }
        [Required, StringLength(50)]
        public string LastName { get; set; }

        [Required, StringLength(60)]
        public string Email { get; set; }

        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        public PicturePath? PictureLocation { get; set; }

        [Required]
        public int ReputationPoints { get; set; } = 0;

        public override string ToString()
        {
            return $"Id = {Id}\nFirstName = {FirstName}\nLastName = {LastName}\nEmail = {Email}\nPhoneNumber = {PhoneNumber}\nReputationPoints = {ReputationPoints}";
        }
    }
}
