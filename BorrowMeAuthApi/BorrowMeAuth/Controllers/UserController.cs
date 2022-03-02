using AutoMapper;
using BorrowMeAuth.Areas.Identity.Data;
using BorrowMeAuth.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyHotels.WebApi.Infrastructure;

namespace BorrowMeAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<BorrowMeAuthUser> _userManager;
        private readonly IAuthenticationManager _authenticationManager;
        public UserController(ILogger<UserController> logger, IMapper mapper, UserManager<BorrowMeAuthUser> userManager, IAuthenticationManager authenticationManager)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _authenticationManager = authenticationManager;
        }


        [HttpPost]

        public async Task<IActionResult> RegisterApiUser([FromBody] RegisterApiUserDto userDto)
        {
            var user = _mapper.Map<BorrowMeAuthUser>(userDto);
            user.UserName = user.Email;
            var result = await _userManager.CreateAsync(user, userDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }
            return Ok();
        }

        [HttpOptions]
        public async Task<IActionResult> LoginApiUser([FromBody] LoginApiUserDto userDto)
        {
            _logger.LogInformation($"{nameof(LoginApiUser)} called...");
            _logger.LogInformation($"Login attempt for {userDto.Email}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _authenticationManager.ValidateApiUser(userDto))
            {
                return Unauthorized(userDto);
            }

            return Accepted(new { Token = await _authenticationManager.CreateJwtToken() });
        }

    }
}
