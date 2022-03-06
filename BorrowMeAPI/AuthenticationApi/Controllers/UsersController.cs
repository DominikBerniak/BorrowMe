using AutoMapper;
using BorrowMeAuth.Areas.Identity.Data;
using BorrowMeAuth.DTO;
using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyHotels.WebApi.Infrastructure;
using System.Security.Claims;

namespace BorrowMeAuth.Controllers
{
    [Route("authentication")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<BorrowMeAuthUser> _userManager;
        private readonly IAuthenticationManager _authenticationManager;
        private readonly IUserService _userService;

        public UsersController(ILogger<UsersController> logger, IMapper mapper,
            UserManager<BorrowMeAuthUser> userManager, IAuthenticationManager authenticationManager,
            IUserService userService)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _authenticationManager = authenticationManager;
            _userService = userService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> RegisterApiUser([FromBody] RegisterApiUserDto userDto)
        {
            bool isEmailTaken = await _userManager.FindByEmailAsync(userDto.Email) is not null;
            if (isEmailTaken)
            {
                _logger.LogInformation("User submited email that is already taken");
                return BadRequest();
            }
            var user = _mapper.Map<BorrowMeAuthUser>(userDto);
            user.UserName = user.Email;

            BusinessUserDto businessUserData = new BusinessUserDto
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email
            };
            User businessUser = await _userService.AddUser(businessUserData);
            user.BusinessUserId = businessUser.Id.ToString();
            var result = await _userManager.CreateAsync(user, userDto.Password);
            await _userManager.AddToRoleAsync(user, "User");

            if (!result.Succeeded)
            {
                _logger.LogInformation("error: " + result);
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return BadRequest(ModelState);
            }
            return Ok();
        }

        [HttpPost("login")]
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
            _logger.LogInformation("Login successful");
            var jwt = await _authenticationManager.CreateJwtToken();
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Accepted(new
            {
                message = "Login successful"
            });
        }

        [HttpGet("user")]
        public async Task<ActionResult<AuthenticatedUserDto>> GetAuthenticatedUser()
        {
            _logger.LogInformation("Attempting to get user by JWT");
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _authenticationManager.Verify(jwt);
                var userEmail = token.Claims.Where(c => c.Type == ClaimTypes.Email).First().Value;
                var user = await _userManager.FindByEmailAsync(userEmail);
                List<string> userRoles = (List<string>) await _userManager.GetRolesAsync(user);
                if (user == null)
                {
                    return NotFound();
                }

                AuthenticatedUserDto userData = new AuthenticatedUserDto
                {
                    BusinessUserId = user.BusinessUserId,
                    Roles = userRoles
                };
                return Ok(userData);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult LogoutUser()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "Logout successful"
            });
        }
    }
}