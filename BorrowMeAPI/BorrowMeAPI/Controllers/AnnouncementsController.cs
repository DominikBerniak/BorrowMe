using BorrowMeAPI.Model;
using BorrowMeAPI.Services;
using BorrowMeAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {

        private readonly ILogger _logger;
        private readonly IAnnouncementService _announcementService;

        public AnnouncementsController(ILogger<AnnouncementsController> logger, IAnnouncementService announcementService)
        {
            _logger = logger;
            _announcementService = announcementService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Announcement>>> GetAllAnnouncements()
        {
            _logger.LogInformation("Get all announcements attempt.");
            return Ok(_announcementService.GetAnnouncements());
        }

        // /api/Announcements POST
        [HttpPost]
        public async Task<IActionResult> AddNewAnnouncement(Announcement announcement)
        {
            _logger.LogInformation("Add new announcements attempt.");
            _announcementService.AddAnnouncement(announcement);
            return Ok();
        }

        // /api/Announcements/{id} GET
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAnnouncementById(int id)
        {
            _logger.LogInformation($"Get announcement attempt. Id = '{id}'");
            return Ok(_announcementService.GetAnnouncement(id));
        }

        // /api/Announcements/ PUT
        [HttpPut]
        public async Task<IActionResult> EditWholeAnnouncement(Announcement announcement)
        {
            _logger.LogInformation($"Edit announcement attempt. Id = '{announcement.Id}'");
            _announcementService.UpdateAnnouncement(announcement);
            return Ok();
        }

        // /api/Announcements/{id} PATCH
        [HttpPatch("{id:int}")]
        public IActionResult EditOneInAnnouncement(int id)
        {
            return Ok("Not Implemented");
        }

        // /api/Announcements/{id} DELETE
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            _logger.LogInformation($"Delete announcement attempt. Id = '{id}'");
            _announcementService.DeleteAnnouncement(id);
            return Ok();
        }

        // /api/Announcements/{category}/{voivodeship}/{city}/{search_phrase} GET
        [HttpGet("{category}/{voivodeship}/{city}/{searchPhrase}/{currentPage}")]
        public async Task<IActionResult> GetAnnouncementByFilters(string category = "all", string voivodeship = "all", string city = "all", string searchPhrase = "all", int currentPage = 1)
        {
            return Ok(_announcementService.GetAnnouncementByFilters(category, voivodeship, city, searchPhrase));
            //const float numberOfAnnoucementsPerPage = 4f;
            //#region data
            //User user = new User()
            //{
            //    Id = 1,
            //    FirstName = "Pablo",
            //    LastName = "Picasso",
            //    Email = "PPicasso@gmail.com",
            //    PhoneNumber = "123456879",
            //    ReputationPoints = 0
            //};
            //Category category2 = new Category()
            //{
            //    Id = 1,
            //    Name = "Narzędzia elektryczne"
            //};
            //Voivodeship voivodeship2 = new Voivodeship()
            //{
            //    Id = 1,
            //    Name = "Małopolskie"
            //};

            //Announcement mock1 = new Announcement()
            //{
            //    Id = 1,
            //    Title = "Zakrętarka udarowa DeWalt",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "zakretarka.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Kraków",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock2 = new Announcement()
            //{
            //    Id = 2,
            //    Title = "Spawarka MIG 325",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "spawarka.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Skawina",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock3 = new Announcement()
            //{
            //    Id = 3,
            //    Title = "Betoniarka 150L",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "betoniarka.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Inwałd",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock4 = new Announcement()
            //{
            //    Id = 4,
            //    Title = "Kosa spalinowa Stihl",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "podkaszarka.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Bochnia",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock5 = new Announcement()
            //{
            //    Id = 5,
            //    Title = "Sekator teleskopowy",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "sekator.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Targowisko",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock6 = new Announcement()
            //{
            //    Id = 6,
            //    Title = "Wiertarka udarowa makita",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "makita.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Kraków",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock7 = new Announcement()
            //{
            //    Id = 7,
            //    Title = "Szlifierka taśmowa 'czołg' Parksite",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "czolg.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Brzesko",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock8 = new Announcement()
            //{
            //    Id = 8,
            //    Title = "Opryskiwacz ciśnieniowy matabi",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "opryskiwacz.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Tarnów",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock9 = new Announcement()
            //{
            //    Id = 9,
            //    Title = "Nożyce elektrycze do żywopłotu",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "nozyce.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Bochnia",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock10 = new Announcement()
            //{
            //    Id = 10,
            //    Title = "Myjka ciśnieniowa Karcher",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "karcher.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Kraków",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //Announcement mock11 = new Announcement()
            //{
            //    Id = 11,
            //    Title = "Taczka ogrodowa",
            //    Description = "Super wiertara",
            //    PublishDate = DateTime.Now,
            //    PictureLocation = new PicturePath("site-images", "taczka.png"),
            //    Owner = user,
            //    Category = category2,
            //    City = new City()
            //    {
            //        Id = 1,
            //        Name = "Kraków",
            //        Voivodeship = voivodeship2
            //    }
            //};

            //var announcements = new List<Announcement>
            //{
            //    mock1,mock2, mock3, mock4, mock5, mock6, mock7,
            //    mock8, mock9, mock10, mock11
            //};

            //#endregion

            //var query = (IEnumerable<Announcement>)announcements;
            //if (category != "all")
            //{
            //    query = query.Where(a => a.Category.Name == category);
            //}
            //if (voivodeship != "all")
            //{
            //    query = query.Where(a => a.City.Voivodeship.Name == voivodeship);
            //}
            //if (city != "all")
            //{
            //    query = query.Where(a => a.City.Name == city);
            //}
            //if (searchPhrase != "all")
            //{
            //    query = query.Where(a => a.Title.ToLower().Contains(searchPhrase.ToLower()) || a.Description.ToLower().Contains(searchPhrase.ToLower()));
            //}

            //var searchResults = query.ToList();
            //var numberOfPages = Math.Ceiling(searchResults.Count / numberOfAnnoucementsPerPage);
            //if (searchResults.Count == 0)
            //{
            //    return NotFound();
            //}
            //if (currentPage > numberOfPages)
            //{
            //    return BadRequest();
            //}

            //searchResults = searchResults.Skip((currentPage - 1) * (int)numberOfAnnoucementsPerPage)
            //    .Take((int)numberOfAnnoucementsPerPage).ToList();

            //var response = new SearchedAnnoucementsDTO
            //{
            //    Announcements = searchResults,
            //    NumberOfPages = (int)numberOfPages,
            //    CurrentPage = currentPage
            //};
            //return Ok(response);
        }

        // /api/Announcements/{id}/Reservation POST
        [HttpPost("{id}/Reservation")]
        public async Task<IActionResult> AddNewReservation(int id)
        {
            return Ok();
        }

        // /api/Announcements/{id}/Reservation DELETE
        [HttpDelete("{id}/Reservation")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            return Ok();
        }
    }
}
