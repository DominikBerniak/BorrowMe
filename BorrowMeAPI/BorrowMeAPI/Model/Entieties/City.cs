using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Required, ForeignKey("voivodship_id")]
        public Voivodeship Voivodeship { get; set; }
    }
}
