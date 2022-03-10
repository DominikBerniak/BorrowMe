using Core.Model;
using Core.Model.DataTransferObjects;
using Core.Services;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IAnnouncementService _announcementService;
        private readonly IReservationService _reservationService;

        public AnnouncementsController(ILogger<AnnouncementsController> logger, IAnnouncementService announcementService, IReservationService reservationService)
        {
            _logger = logger;
            _announcementService = announcementService;
            _reservationService = reservationService;
        }
        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<List<SearchedAnnoucementsDTO>>> GetAnnouncements([FromQuery] SearchedAnnouncementFilterDto searchFilter)
        {
            _logger.LogInformation($"Getting announcements with params: page: {searchFilter.PageNumber}, " +
                $"category: {searchFilter.CategoryName}, voivodeship: {searchFilter.VoivodeshipName}, " +
                $"city: {searchFilter.CityName}, searchPhrase: {searchFilter.SearchPhrase}");

            var announcementDto = await _announcementService.GetAnnouncements(searchFilter);
            if (announcementDto.Status == Status.NotFound)
            {
                _logger.LogInformation("No annoucements found");
                return NotFound("No annoucements found");
            }
            if (announcementDto.Status == Status.BadRequest)
            {
                _logger.LogError("Wrong page number");
                return BadRequest(announcementDto);
            }
            var response = new SearchedAnnoucementsDTO
            {
                Announcements = announcementDto.Announcements,
                NumberOfPages = announcementDto.NumberOfPages,
                CurrentPage = searchFilter.PageNumber
            };
            return Ok(response);
        }

        [HttpGet("promoted")]
        public async Task<ActionResult<List<Announcement>>> GetPromotedAnnouncements()
        {
            var announcements = await _announcementService.GetPromotedAnnouncements();
            return Ok(announcements);
        }

        // /api/Announcements POST
        //[Authorize(Roles = "user")]
        [HttpPost]
        public async Task<ActionResult<CreateAnnouncementStatusDto>> AddNewAnnouncement([FromForm] CreateAnnouncementDto announcementData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _logger.LogInformation("Add new announcements attempt.");
            var createdannouncementData = await _announcementService.AddAnnouncement(announcementData);
            _logger.LogInformation(createdannouncementData.StatusMessage);
            if (createdannouncementData.Status == Status.BadRequest)
            {
                return BadRequest(createdannouncementData.StatusMessage);
            }
            return Created($"/api/Announcements/{createdannouncementData.CreatedAnnoucement.Id}", createdannouncementData.CreatedAnnoucement);
        }

        // /api/Announcements/{id} GET
        [HttpGet("{id}")]
        public async Task<ActionResult<AnnouncementReservationsDto>> GetAnnouncementById(Guid id)
        {
            _logger.LogInformation($"Get announcement attempt. Id = '{id}'");
            var announcement = await _announcementService.GetAnnouncement(id);
            var reservations = await _reservationService.GetByAnnouncementId(id);
            var announcementData = new AnnouncementReservationsDto
            {
                Announcement = announcement,
                Reservations = reservations
            };
        return Ok(announcementData);
        }

        // /api/Announcements/ PUT
        [HttpPut]
        public async Task<ActionResult<Announcement>> EditWholeAnnouncement(Announcement announcement)
        {
            _logger.LogInformation($"Edit announcement attempt. Id = '{announcement.Id}'");
            return Ok(await _announcementService.UpdateAnnouncement(announcement));
        }

        // /api/Announcements/{id} PATCH
        [HttpPatch("{id:int}")]
        public IActionResult EditOneInAnnouncement(Guid id)
        {
            return Ok("Not Implemented");
        }

        // /api/Announcements/{id} DELETE
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAnnouncement(Guid id)
        {
            _logger.LogInformation($"Delete announcement attempt. Id = '{id}'");
            var response = await _announcementService.DeleteAnnouncement(id);
            return Ok(response);
        }
    }
}
