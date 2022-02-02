using BorrowMeAPI.Model;
using Microsoft.AspNetCore.Mvc;


namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [Route("/api/Announcements")]
        [HttpGet]
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
                PicturePath = @"C:\Users\MiniMonster\Documents\repos\BorrowMe\images\bobr.jpg",
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
                PicturePath = @"C:\Users\MiniMonster\Documents\repos\BorrowMe\images\zubr.jpg",
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
                PicturePath = @"C:\Users\MiniMonster\Documents\repos\BorrowMe\images\losiek.jpg",
                Owner = user,
                Category = category,
                City = city
            };

            //return Ok(user);
            return Ok(new List<Announcement>() { mock1, mock2, mock3});
        }



        // /api/Announcements POST

        // /api/Announcements/{id} GET
        // /api/Announcements/{id} PUT
        // /api/Announcements/{id} PATCH
        // /api/Announcements/{id} DELETE
        // /api/Announcements GET
        // /api/Announcements/{category}/{voivodship}/{city}/{search_phrase} GET

        // /api/Announcements/{id}/Reservation POST
        // /api/Announcements/{id}/Reservation DELETE

        // /api/Notifications POST
        // /api/Users/{user_id}/Notifications GET
        // /api/Users/{user_id}/Notifications/{id} DELETE
    }
}
