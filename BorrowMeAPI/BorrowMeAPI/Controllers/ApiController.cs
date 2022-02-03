using BorrowMeAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {

        private readonly ILogger _logger;

        public ApiController(ILogger<ApiController> logger)
        {
            _logger = logger;
        }
        [HttpGet("Announcements")]
        public IActionResult GetAllAnnouncements()
        {
            User user = new User()
            {
                Id = 1,
                FirstName = "Pablo",
                LastName = "Picasso",
                Email = "PPicasso@gmail.com",
                PhoneNumber = "123456879",
                ReputationPoints = 0
            };
            Category category = new Category()
            {
                Id = 1,
                Name = "Narzędzia elektryczne"
            };
            City city = new City()
            {
                Id = 1,
                Name = "Bydgoszcz",
                Voivodeship = new Voivodeship()
                {
                    Id = 1,
                    Name = "chujwiejakie"
                }
            };
            Announcement mock1 = new Announcement()
            {
                Id = 1,
                Title = "wiertara",
                Description = "Super wiertara krórej używałem ze swoim starym",
                PublishDate = DateTime.Now,
                PictureLocation = new PicturePath("site-images", "bobr.jpg"),
                Owner = user,
                Category = category,
                City = city
            };
            Announcement mock2 = new Announcement()
            {
                Id = 2,
                Title = "spawara",
                Description = "Super spawara krórej używałem ze swoim starym",
                PublishDate = DateTime.Now,
                PictureLocation = new PicturePath("site-images", "losiek.jpg"),
                Owner = user,
                Category = category,
                City = city
            };
            Announcement mock3 = new Announcement()
            {
                Id = 3,
                Title = "szlifiera",
                Description = "Super szlifiera krórej używałem ze swoim starym",
                PublishDate = DateTime.Now,
                PictureLocation = new PicturePath("site-images", "saddog.png"),
                Owner = user,
                Category = category,
                City = city
            };

            //return Ok(user);
            return Ok(new List<Announcement>() { mock1, mock2, mock3 });
        }

        [HttpGet("Cities")]
        public async Task<IActionResult> GetAllCities()
        {
            Voivodeship voivodship1 = new Voivodeship
            {
                Id = 1,
                Name = "Małopolskie"
            };
            City city1 = new City
            {
                Id = 1,
                Name = "Kraków",
                Voivodeship = voivodship1
            };
            City city2 = new City
            {
                Id = 2,
                Name = "Zakopane",
                Voivodeship = voivodship1
            };

            Voivodeship voivodship2 = new Voivodeship
            {
                Id = 2,
                Name = "Mazowieckie"
            };
            City city3 = new City
            {
                Id = 3,
                Name = "Warszawa",
                Voivodeship = voivodship2
            };

            Voivodeship voivodship3 = new Voivodeship
            {
                Id = 3,
                Name = "Pomorskie"
            };
            City city4 = new City
            {
                Id = 4,
                Name = "Gdańsk",
                Voivodeship = voivodship3
            };
            City city5 = new City
            {
                Id = 5,
                Name = "Gdynia",
                Voivodeship = voivodship3
            };
            City city6 = new City
            {
                Id = 6,
                Name = "Sopot",
                Voivodeship = voivodship3
            };

            Voivodeship voivodship4 = new Voivodeship
            {
                Id = 4,
                Name = "Łódzkie"
            };
            City city7 = new City
            {
                Id = 7,
                Name = "Łódź",
                Voivodeship = voivodship4
            };

            Voivodeship voivodship5 = new Voivodeship
            {
                Id = 5,
                Name = "Śląskie"
            };
            City city8 = new City
            {
                Id = 8,
                Name = "Katowice",
                Voivodeship = voivodship5
            };
            City city9 = new City
            {
                Id = 9,
                Name = "Dąbrowa Górnicza",
                Voivodeship = voivodship5
            };
            City city10 = new City
            {
                Id = 10,
                Name = "Częstochowa",
                Voivodeship = voivodship5
            };

            Voivodeship voivodship6 = new Voivodeship
            {
                Id = 6,
                Name = "Dolnośląskie"
            };
            City city11 = new City
            {
                Id = 11,
                Name = "Wrocław",
                Voivodeship = voivodship6
            };

            Voivodeship voivodship7 = new Voivodeship
            {
                Id = 7,
                Name = "Kujawsko-pomorskie"
            };
            City city12 = new City
            {
                Id = 12,
                Name = "Bydgoszcz",
                Voivodeship = voivodship7
            };
            City city13 = new City
            {
                Id = 13,
                Name = "Toruń",
                Voivodeship = voivodship7
            };

            Voivodeship voivodship8 = new Voivodeship
            {
                Id = 8,
                Name = "Lubelskie"
            };
            City city14 = new City
            {
                Id = 14,
                Name = "Lublin",
                Voivodeship = voivodship8
            };

            Voivodeship voivodship9 = new Voivodeship
            {
                Id = 9,
                Name = "Lubuskie"
            };
            City city15 = new City
            {
                Id = 15,
                Name = "Zielona Góra",
                Voivodeship = voivodship9
            };

            Voivodeship voivodship10 = new Voivodeship
            {
                Id = 10,
                Name = "Opolskie"
            };
            City city16 = new City
            {
                Id = 16,
                Name = "Opole",
                Voivodeship = voivodship10
            };

            Voivodeship voivodship11 = new Voivodeship
            {
                Id = 11,
                Name = "Podkarpackie"
            };
            City city17 = new City
            {
                Id = 17,
                Name = "Rzeszów",
                Voivodeship = voivodship11
            };

            Voivodeship voivodship12 = new Voivodeship
            {
                Id = 12,
                Name = "Podlaskie"
            };
            City city18 = new City
            {
                Id = 18,
                Name = "Białystok",
                Voivodeship = voivodship12
            };

            Voivodeship voivodship13 = new Voivodeship
            {
                Id = 13,
                Name = "Świętokrzyskie"
            };
            City city19 = new City
            {
                Id = 19,
                Name = "Kielce",
                Voivodeship = voivodship13
            };

            Voivodeship voivodship14 = new Voivodeship
            {
                Id = 14,
                Name = "Warmińsko-mazurskie"
            };
            City city20 = new City
            {
                Id = 20,
                Name = "Olsztyn",
                Voivodeship = voivodship14
            };

            Voivodeship voivodship15 = new Voivodeship
            {
                Id = 15,
                Name = "Wielkopolskie"
            };
            City city21 = new City
            {
                Id = 21,
                Name = "Poznań",
                Voivodeship = voivodship15
            };

            Voivodeship voivodship16 = new Voivodeship
            {
                Id = 16,
                Name = "Zachodniopomorskie"
            };
            City city22 = new City
            {
                Id = 22,
                Name = "Szczeciń",
                Voivodeship = voivodship16
            };
            List<City> cities = new List<City>
            {
                city1, city2, city3, city4, city5, city6, city7, city8,
                city9, city10, city11, city12, city13, city14, city15,
                city16, city17, city18, city19, city20, city21, city22
            };

            return Ok(cities);
        }

        [Route("Image/{directory}/{imageName}")]
        [HttpGet]
        public IActionResult GetImage(string directory, string imageName)
        {
            //var filename = @$"E:\Codecool\ASP.NET\BorrowMe\Repository\BorrowMe\images\{directory}\{imageName}";
            var filename = @$"C:\Users\MiniMonster\Documents\repos\BorrowMe\images\{directory}\{imageName}";
            if (System.IO.File.Exists(filename))
            {
                return PhysicalFile(filename, "image / jpeg");
            }
            else
            {
                return NotFound("No such image!");
            }
        }






        // /api/Announcements POST
        [HttpPost("Announcements")]
        public async Task<IActionResult> AddNewAnnouncement()
        {
            return Ok();
        }

        // /api/Announcements/{id} GET
        [HttpGet("Announcements/{id:int}")]
        public async Task<IActionResult> GetAnnouncementById(int id)
        {
            return Ok();
        }

        // /api/Announcements/{id} PUT
        [HttpPut("Announcements/{id:int}")]
        public async Task<IActionResult> EditWholeAnnouncement(int id)
        {
            return Ok();
        }

        // /api/Announcements/{id} PATCH
        [HttpPatch("Announcements/{id:int}")]
        public IActionResult EditOneInAnnouncement(int id)
        {
            return Ok();
        }

        // /api/Announcements/{id} DELETE
        [HttpDelete("Announcements/{id:int}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            return Ok();
        }

        // /api/Announcements/{category}/{voivodeship}/{city}/{search_phrase} GET
        [HttpGet("Announcements/{category}/{voivodeship}/{city}/{searchPhrase}")]
        public async Task<IActionResult> GetAnnouncementByFilters(string category, string voivodeship, string city, string searchPhrase)
        {
            return Ok();
        }

        // /api/Announcements/{id}/Reservation POST
        [HttpPost("Announcements/{id}/Reservation")]
        public async Task<IActionResult> AddNewReservation(int id)
        {
            return Ok();
        }

        // /api/Announcements/{id}/Reservation DELETE
        [HttpDelete("Announcements/{id}/Reservation")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            return Ok();
        }

        // /api/Notifications POST
        [HttpPost("Notifications")]
        public async Task<IActionResult> AddNewNotification([FromBody] Notification notification)
        {
            return Ok();
        }

        // /api/Users/{user_id}/Notifications GET
        [HttpGet("Users/{user_id}/Notifications")]
        public async Task<IActionResult> GetAllUserNotifications(int userId)
        {
            return Ok();
        }

        // /api/Users/{user_id}/Notifications/{id} DELETE
        [HttpDelete("Users/{user_id}/Notifications")]
        public async Task<IActionResult> DeleteUserNotification(int userId)
        {
            return Ok();
        }
    }
}
