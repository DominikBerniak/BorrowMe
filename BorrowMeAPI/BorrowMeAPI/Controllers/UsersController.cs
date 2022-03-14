using AutoMapper;
using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IUserService _userService;
        private readonly IAnnouncementService _announcementService;
        private readonly IMapper _mapper;

        public UsersController(ILogger<AnnouncementsController> logger, IUserService userService, IMapper mapper, IAnnouncementService announcementService)
        {
            _logger = logger;
            _userService = userService;
            _mapper = mapper;
            _announcementService = announcementService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetUserDto>> GetUserById(Guid id)
        {
            _logger.LogInformation($"Get user attempt. Id = '{id}'");
            var user = await _userService.GetUser(id);
            if (user is null)
            {
                return NotFound();
            }
            var userData = _mapper.Map<GetUserDto>(user);
            return Ok(userData);
        }

        [HttpGet("{id}/details")]
        public async Task<ActionResult<UserDetailsDto>> GetUserDetails(Guid id)
        {
            _logger.LogInformation($"Get user details attempt. Id = '{id}'");
            var user = await _userService.GetUser(id);
            if (user is null)
            {
                return NotFound();
            }
            var announcements = await _announcementService.GetAnnouncementsByUserId(id);
            var userDetails = new UserDetailsDto()
            {
                User = user,
                Announcements = announcements
            };
            return Ok(userDetails);
        }
    }
}
