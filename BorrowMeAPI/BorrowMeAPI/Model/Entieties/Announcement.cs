using BorrowMeAPI.Model.Entieties;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    public class Announcement : EntityBase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required, StringLength(50)]
        public string Title { get; set; }
        [Required, StringLength(500)]
        public string Description { get; set; }
        [Required, DataType(DataType.DateTime)]
        public DateTime PublishDate { get; set; }
        public List<PicturePath>? PictureLocations { get; set; }
        [Required]
        public User? Owner { get; set; }
        [Required]
        public SubCategory SubCategory { get; set; }
        [Required]
        public Voivodeship Voivodeship { get; set; }
        [Required]
        public City City { get; set; }
        [Required, Column(TypeName = "varchar(50)")]
        public PaymentType PaymentType { get; set; }
        [Precision(6, 2)]
        public decimal? Price { get; set; }
        [StringLength(50)]
        public string? OtherPaymentType { get; set; }
    }

    public enum PaymentType
    {
        Free,
        Money,
        Beer,
        Other
    }
}