using AutoMapper;
using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(ILogger<AnnouncementsController> logger, IUserService userService, IMapper mapper)
        {
            _logger = logger;
            _userService = userService;
            _mapper = mapper;
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
    }
}
