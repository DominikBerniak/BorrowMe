using Domain.Entieties;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly ILogger _logger;

        public NotificationsController(ILogger<NotificationsController> logger)
        {
            _logger = logger;
        }

        // /api/Notifications POST
        [HttpPost]
        public async Task<IActionResult> AddNewNotification([FromBody] AvailabilityNotification notification)
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
