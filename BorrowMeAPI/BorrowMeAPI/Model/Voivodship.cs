using System.ComponentModel.DataAnnotations;

namespace BorrowMeAPI.Model
{
    public class Voivodship
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }
    }
}