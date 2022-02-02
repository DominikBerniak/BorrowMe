using BorrowMeAPI.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;


namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [HttpGet("Announcements")]
        public IActionResult GetAllAnnouncements()
        {
            User user = new User()
            {
                Id = Guid.NewGuid(),
                FirstName = "Pablo",
                LastName = "Picasso",
                Email = "PPicasso@gmail.com",
                PhoneNumber = "123456879",
                ReputationPoints = 0
            };
            Category category = new Category()
            {
                Id = Guid.NewGuid(),
                Name = "Narzędzia elektryczne"
            };
            City city = new City()
            {
                Id = Guid.NewGuid(),
                Name = "Bydgoszcz",
                Voivodship = new Voivodship()
                {
                    Id = Guid.NewGuid(),
                    Name = "chujwiejakie"
                }
            };
            Announcement mock1 = new Announcement()
            {
                Id = Guid.NewGuid(),
                Title = "wiertara",
                Description = "Super wiertara krórej używałem ze swoim starym",
                PublishDate = DateTime.Now,
                PicturePath = @"http://192.168.1.33:8080\images\bobr.jpg",
                Owner = user,
                Category = category,
                City = city
            };
            Announcement mock2 = new Announcement()
            {
                Id = Guid.NewGuid(),
                Title = "spawara",
                Description = "Super spawara krórej używałem ze swoim starym",
                PublishDate = DateTime.Now,
                PicturePath = @"http://192.168.1.33:8080\images\zubr.jpg",
                Owner = user,
                Category = category,
                City = city
            };
            Announcement mock3 = new Announcement()
            {
                Id = Guid.NewGuid(),
                Title = "szlifiera",
                Description = "Super szlifiera krórej używałem ze swoim starym",
                PublishDate = DateTime.Now,
                PicturePath = @"http://192.168.1.33:8080\images\losiek.jpg",
                Owner = user,
                Category = category,
                City = city
            };

            //return Ok(user);
            return Ok(new List<Announcement>() { mock1, mock2, mock3});
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
