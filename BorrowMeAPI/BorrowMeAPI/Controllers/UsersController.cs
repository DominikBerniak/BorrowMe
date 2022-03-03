using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IUserService _userService;

        public UsersController(ILogger<AnnouncementsController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(Guid id)
        {
            _logger.LogInformation($"Get user attempt. Id = '{id}'");
            var user = await _userService.GetUser(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
