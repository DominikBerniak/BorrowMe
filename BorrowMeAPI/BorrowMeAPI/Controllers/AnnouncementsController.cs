using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IAnnouncementService _announcementService;

        public AnnouncementsController(ILogger<AnnouncementsController> logger, IAnnouncementService announcementService)
        {
            _logger = logger;
            _announcementService = announcementService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Announcement>>> GetAllAnnouncements()
        {
            _logger.LogInformation("Get all announcements attempt.");
            return Ok(await _announcementService.GetAnnouncements());
        }

        // /api/Announcements POST
        [HttpPost]
        public async Task<ActionResult<Announcement>> AddNewAnnouncement(AnnouncementDTO announcementDTO)
        {
            _logger.LogInformation("Add new announcements attempt.");
            _logger.LogInformation(announcementDTO.ToString());

            //return Ok();
            var createdannouncement = await _announcementService.AddAnnouncement(announcementDTO);
            return Ok(createdannouncement);
        }

        // /api/Announcements/{id} GET
        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncementById(Guid id)
        {
            _logger.LogInformation($"Get announcement attempt. Id = '{id}'");
            return Ok(await _announcementService.GetAnnouncement(id));
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

        // /api/Announcements/{category}/{voivodeship}/{city}/{search_phrase} GET
        [HttpGet("{category}/{voivodeship}/{city}/{searchPhrase}/{currentPage}")]
        public async Task<ActionResult<SearchedAnnoucementsDTO>> GetAnnouncementByFilters(string category = "all", string voivodeship = "all", string city = "all", string searchPhrase = "all", int currentPage = 1)
        {
            _logger.LogInformation($"Get announcement by filters attempt. category = '{category}', voivodeship = '{voivodeship}', city = '{city}, searchPhraze = '{searchPhrase}'");
            var announcementDto = await _announcementService.GetAnnouncementByFilters(category, voivodeship, city, searchPhrase, currentPage);
            if (announcementDto.Status == Status.NotFound)
            {
                _logger.LogInformation("No annoucements found");
                return NotFound("No annoucements found");
            }
            if (announcementDto.Status == Status.BadRequest)
            {
                _logger.LogError("Wrong page number");
                return BadRequest("Wrong page number");
            }

            var response = new SearchedAnnoucementsDTO
            {
                Announcements = announcementDto.Announcements,
                NumberOfPages = announcementDto.NumberOfPages,
                CurrentPage = currentPage
            };
            return Ok(response);
        }

        // /api/Announcements/{id}/Reservation POST
        [HttpPost("{id}/Reservation")]
        public async Task<IActionResult> AddNewReservation(int id)
        {
            return Ok();
        }

        // /api/Announcements/{id}/Reservation DELETE
        [HttpDelete("{id}/Reservation")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            return Ok();
        }
    }
}
