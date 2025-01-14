﻿using Domain.Entieties;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

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

    public class CreateAnnouncementDto
    {
        [Required, StringLength(maximumLength: 50, ErrorMessage = "Announcement title is too long!")]
        public string Title { get; set; }
        [Required, StringLength(maximumLength: 500, ErrorMessage = "Announcement description is too long!")]
        public string Description { get; set; }
        public List<IFormFile>? ImageFiles { get; set; }
        public List<string>? ImageNames { get; set; }
        [Required]
        public Guid OwnerId { get; set; }
        [Required]
        public Guid SubCategoryId { get; set; }
        [Required]
        public string VoivodeshipName { get; set; }
        [Required]
        public string CityName { get; set; }
        [Required]
        public PaymentType PaymentType { get; set; }
        [Precision(6, 2)]
        public decimal Price { get; set; } = 0;
        [StringLength(maximumLength: 50, ErrorMessage = "Announcement other payment type is too long!")]
        public string? OtherPaymentType { get; set; }
    }
    public class CreateAnnouncementStatusDto
    {
        public Announcement CreatedAnnoucement { get; set; }
        public Status Status { get; set; }
        public string StatusMessage { get; set; }
    }
}
