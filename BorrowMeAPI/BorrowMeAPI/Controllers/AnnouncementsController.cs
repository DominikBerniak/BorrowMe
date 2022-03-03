using Core.Model;
using Core.Model.DataTransferObjects;
using Core.Services;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<List<SearchedAnnoucementsDTO>>> GetAnnouncements([FromQuery] int page = 1, 
            [FromQuery] string? category = "all", [FromQuery] string? voivodeship = "all", [FromQuery] string? city = "all", 
            [FromQuery] string? searchPhrase = "all", [FromQuery] int costMin = 0, [FromQuery] int costMax = 50,
            [FromQuery] string? sortBy="publishDate", [FromQuery] string? sortDirection = "desc")
        {
            _logger.LogInformation($"Getting announcements with params: page: {page}, category: {category}, voivodeship: {voivodeship}, " +
                $"city: {city}, searchPhrase: {searchPhrase}");

            var announcementDto = await _announcementService.GetAnnouncements(category, voivodeship, city, searchPhrase, page, costMin, costMax, sortBy, sortDirection);
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
                CurrentPage = page
            };
            return Ok(response);            
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

        // /api/Announcements/{category}/{voivodeship}/{city}/{search_phrase} GET
        //[HttpGet("{category}/{voivodeship}/{city}/{searchPhrase}/{currentPage}")]
        //public async Task<ActionResult<SearchedAnnoucementsDTO>> GetAnnouncementByFilters(string category = "all", string voivodeship = "all", string city = "all", string searchPhrase = "all", int currentPage = 1)
        //{
        //    _logger.LogInformation($"Get announcement by filters attempt. category = '{category}', voivodeship = '{voivodeship}', city = '{city}, searchPhraze = '{searchPhrase}'");
        //    var announcementDto = await _announcementService.GetAnnouncements(category, voivodeship, city, searchPhrase, currentPage);
        //    if (announcementDto.Status == Status.NotFound)
        //    {
        //        _logger.LogInformation("No annoucements found");
        //        return NotFound("No annoucements found");
        //    }
        //    if (announcementDto.Status == Status.BadRequest)
        //    {
        //        _logger.LogError("Wrong page number");
        //        return BadRequest("Wrong page number");
        //    }

        //    var response = new SearchedAnnoucementsDTO
        //    {
        //        Announcements = announcementDto.Announcements,
        //        NumberOfPages = announcementDto.NumberOfPages,
        //        CurrentPage = currentPage
        //    };
        //    return Ok(response);
        //}
    }
}
