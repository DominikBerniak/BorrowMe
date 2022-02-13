using System.ComponentModel.DataAnnotations;

namespace BorrowMeAPI.Model
{
    public class Voivodeship
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }
    }
}