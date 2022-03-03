using Domain.Entieties;

namespace Core.Model.DataTransferObjects
{
    public class AnnouncementDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime PublishDate { get; set; }
        public List<PicturePath>? PictureLocations { get; set; }
        public Guid UserId { get; set; }
        public Guid SubCategoryId { get; set; }
        public Guid VoivodeshipId { get; set; }
        public Guid CityId { get; set; }
        public PaymentType PaymentType { get; set; }
        public decimal? Price { get; set; }
        public string? OtherPaymentType { get; set; }

        public override string ToString()
        {
            return $"{Title}, {Description}, {PublishDate.ToString()}, {UserId}, {SubCategoryId}, {VoivodeshipId}, {CityId}";
        }
    }
}
