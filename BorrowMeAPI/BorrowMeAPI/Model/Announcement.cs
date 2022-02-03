using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BorrowMeAPI.Model
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Title { get; set; }

        [Required, StringLength(500)]
        public string Description { get; set; }

        [Required, Column("publish_date"), DataType(DataType.DateTime)]
        public DateTime PublishDate { get; set; }

        [Column("picture_path"), StringLength(100)]
        public string? PicturePath { get; set; }

        [Required, ForeignKey("owner_id")]
        public User Owner { get; set; }

        [Required, ForeignKey("category_id")]
        public Category Category { get; set; }

        [Required, ForeignKey("city_id")]
        public City City { get; set; }

    }
}