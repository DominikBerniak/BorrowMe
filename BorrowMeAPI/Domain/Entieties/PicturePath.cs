using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entieties
{
    public class PicturePath
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required, StringLength(100)]
        public string DirectoryName { get; set; }
        [Required, StringLength(70)]
        public string FileName { get; set; }
    }
}
