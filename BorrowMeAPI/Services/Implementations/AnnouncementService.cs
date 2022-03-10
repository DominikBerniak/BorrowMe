using Core.Model.DataTransferObjects;
using Core.Repositories;
using Core.Services.Interfaces;
using Domain.Entieties;

namespace Services.Implementations
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _announcementRepository;

        public AnnouncementService(IAnnouncementRepository announcementRepository)
        {
            _announcementRepository = announcementRepository;
        }

        public async Task<CreateAnnouncementStatusDto> AddAnnouncement(CreateAnnouncementDto announcementData)
        {
            CreateAnnouncementStatusDto resultStatus = new CreateAnnouncementStatusDto();
            try
            {
                var userId = announcementData.OwnerId.ToString();
                var announcementId = Guid.NewGuid();
                var pictureLocations = new List<PicturePath>();
                var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "user-images", userId, announcementId.ToString());
                Directory.CreateDirectory(directoryPath);
                if (announcementData.ImageFiles is not null)
                {
                    string[] allowedImageExtensions = { "jpg", "jpeg", "png" };
                    for (int i = 0; i < announcementData.ImageFiles.Count; i++)
                    {
                        if (!allowedImageExtensions.Contains(announcementData.ImageNames[i].Split('.')[1]))
                        {
                            throw new ArgumentOutOfRangeException(announcementData.ImageNames[i]);
                        }
                        var imageName = announcementId.ToString() + "-" + announcementData.ImageNames[i];
                        var imagePath = Path.Combine(directoryPath, imageName);
                        using (Stream stream = new FileStream(imagePath, FileMode.Create))
                        {
                            announcementData.ImageFiles[i].CopyTo(stream);
                        }
                        pictureLocations.Add(new PicturePath
                        {
                            DirectoryName = Path.Combine("user-images", userId, announcementId.ToString()),
                            FileName = imageName
                        });
                    }
                }
                
                var newAnnouncement = new Announcement
                {
                    Id = announcementId,
                    Title = announcementData.Title,
                    Description = announcementData.Description,
                    PublishDate = DateTime.Now,
                    PictureLocations = pictureLocations,
                    PaymentType = announcementData.PaymentType,
                    Price = announcementData.Price,
                    OtherPaymentType = announcementData.OtherPaymentType,
                };
                resultStatus.CreatedAnnoucement = await _announcementRepository.AddNewAnnouncement(announcementData, newAnnouncement);
                resultStatus.Status = Status.Created;
                resultStatus.StatusMessage = $"Successfully created new announcement with id: {resultStatus.CreatedAnnoucement.Id}.";
            }
            catch (Exception e)
            {
                resultStatus.Status = Status.BadRequest;
                resultStatus.StatusMessage = e.Message;
            }
            return resultStatus;
        }

        public async Task<Announcement> DeleteAnnouncement(Guid id)
        {
            return await _announcementRepository.Delete(await _announcementRepository.GetById(id));
        }

        public async Task<Announcement> GetAnnouncement(Guid announcementId)
        {
            //return await _repository.GetById(announcementId);
            return await _announcementRepository.GetAnnouncementById(announcementId);
        }

        public async Task<FilteredAnnoucementsDto> GetAnnouncements(SearchedAnnouncementFilterDto searchFilter)
        {
            const float numberOfAnnoucementsPerPage = 2f;

            var filteredAnnoucements = await _announcementRepository.GetAnnouncementsByFilters(searchFilter);

            var numberOfPages = Math.Ceiling(filteredAnnoucements.Count / numberOfAnnoucementsPerPage);


            if (filteredAnnoucements.Count == 0)
            {
                return new FilteredAnnoucementsDto
                {
                    Status = Status.NotFound
                };
            }
            if (searchFilter.PageNumber > numberOfPages || searchFilter.PageNumber < 1)
            {
                return new FilteredAnnoucementsDto
                {
                    Status = Status.BadRequest,
                    NumberOfPages = (int)numberOfPages
                };
            }
            filteredAnnoucements = filteredAnnoucements
            .Skip((int) ( searchFilter.PageNumber - 1 ) * (int) numberOfAnnoucementsPerPage)
            .Take((int) numberOfAnnoucementsPerPage)
            .ToList();

            return new FilteredAnnoucementsDto
            {
                Status = Status.Ok,
                Announcements = filteredAnnoucements,
                NumberOfPages = (int) numberOfPages
            };
        }

        public async Task<IEnumerable<Announcement>> GetAnnouncements()
        {
            return await _announcementRepository.GetAllAnnouncements();
        }

        public async Task<List<Announcement>> GetPromotedAnnouncements()
        {
            //na potrzeby demo
            var announcements = await _announcementRepository.GetAllAnnouncements();
            return announcements.Take(4).ToList();
        }

        public async Task<Announcement> UpdateAnnouncement(Announcement announcement)
        {
            return await _announcementRepository.Edit(announcement);
        }
    }
}
