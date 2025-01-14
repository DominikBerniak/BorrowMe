﻿using AutoMapper;
using BorrowMeAuth.Areas.Identity.Data;
using BorrowMeAuth.DTO;
using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Implementations;
using System;
using System.Security.Claims;
using System.Text;

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
        private readonly IConfiguration config;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public UsersController(ILogger<UsersController> logger, IMapper mapper,
            UserManager<BorrowMeAuthUser> userManager, IAuthenticationManager authenticationManager,
            IUserService userService, IConfiguration config, IEmailService emailService, IConfiguration configuration)
        {
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
            _authenticationManager = authenticationManager;
            _userService = userService;
            this.config = config;
            _emailService = emailService;
            _configuration = configuration;
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

            var businessUserData = _mapper.Map<CreateUserDto>(userDto);
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
            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            _logger.LogInformation("Sending email confirmation");
            await _emailService.SendConfirmationEmail(user.Id, user.Email, token);

            return Created($"/api/Users/{businessUser.Id}", businessUser);
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
            var authenticationStatus = await _authenticationManager.ValidateApiUser(userDto);
            if (authenticationStatus == AuthenticationStatus.EmailNotConfirmed)
            {
                _logger.LogInformation("User email not confirmed.");
                return Unauthorized("Email not confirmed");
            }
            if (authenticationStatus == AuthenticationStatus.Unauthorized)
            {
                _logger.LogInformation("Wrong login data");
                return Unauthorized("Wrong login data");
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

        [Authorize(Roles = "User")]
        [HttpGet("token")]
        public ActionResult<string> GetAuthenticatedUserToken()
        {
            return Ok(Request.Cookies["jwt"]);
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

        [HttpPost("resetPassword")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> ResetPassword([FromBody]string password)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _authenticationManager.Verify(jwt);
            var userEmail = token.Claims.Where(c => c.Type == ClaimTypes.Email).First().Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            _logger.LogInformation($"Attempting to change passord for user {userEmail}");
            if (user == null)
            {
                _logger.LogInformation($"User {userEmail} not found in db.");
                // Don't reveal that the user does not exist
                return Ok();
            }

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, resetToken, password);
            if (result.Succeeded)
            {
                _logger.LogInformation($"Password successfully changed for user {userEmail}");
                return Ok();
            }

            _logger.LogInformation($"Password successfully changed for user {userEmail}");
            return BadRequest(result.Errors);
        }

        [HttpPut("user")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> EditUser([FromBody] EditApiUserDto userDto)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _authenticationManager.Verify(jwt);
            var userEmail = token.Claims.Where(c => c.Type == ClaimTypes.Email).First().Value;
            BorrowMeAuthUser authUser = await _userManager.FindByEmailAsync(userEmail);
            User newBuisnessUser = await _userService.GetUser(userEmail);

            if (userDto.Email != null)
            {
                var changeEmailToken = await _userManager.GenerateChangeEmailTokenAsync(authUser, userDto.Email);
                var result = await _userManager.ChangeEmailAsync(authUser, userDto.Email, changeEmailToken);
                await _userManager.SetUserNameAsync(authUser, userDto.Email);
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return BadRequest(ModelState);
                }
                newBuisnessUser.Email = userDto.Email;
            }
            if (userDto.FirstName != null)
            {
                newBuisnessUser.FirstName = userDto.FirstName;
            }
            if (userDto.LastName != null)
            {
                newBuisnessUser.LastName = userDto.LastName;
            }
            if (userDto.PhoneNumber != null)
            {
                newBuisnessUser.PhoneNumber = userDto.PhoneNumber;
            }

            await _userService.UpdateUser(newBuisnessUser);

            return Ok();
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
        {
            token = token.Replace(' ', '+');
            var user = await _userManager.FindByIdAsync(userId);
            var response = await _userManager.ConfirmEmailAsync(user, token);
            var clientUrl = _configuration.GetSection("Client").GetSection("Url").Value;
            return Redirect($"{clientUrl}/login");
        }

        [HttpPost("SendResetPasswordEmail")]
        public async Task SendResetPasswordEmail([FromBody]string userEmail)
        {
            _logger.LogInformation($"Forgot password request received for email: {userEmail}");
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user is null)
            {
                return;
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            _logger.LogInformation($"Generated token: {token}");
            await _emailService.SendResetPasswordEmail(userEmail, token);
        }

        [HttpPost("ResetForgottenPassword")]
        public async Task<IActionResult> ResetForgottenPassword(ResetPasswordDto data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userManager.FindByEmailAsync(data.Email);
            if (user is null)
            {
                return BadRequest();
            }
            _logger.LogInformation($"Trying to change password for user: {user.Email}");
            var token = data.Token.Replace(' ', '+');
            var result = await _userManager.ResetPasswordAsync(user, token, data.NewPassword);
            if (result.Succeeded)
            {
                _logger.LogInformation($"Password successfully changed for user {data.Email}");
                return Ok();
            }
            return BadRequest(result);
        }
    }
}