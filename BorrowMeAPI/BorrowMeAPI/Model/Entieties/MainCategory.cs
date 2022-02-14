using BorrowMeAPI.Model.Entieties;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    public class MainCategory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
        [Required]
        public List<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
    }
}
