using Core.Model;
using Core.Model.DataTransferObjects;
using Core.Services;
using Domain.Entieties;
using Microsoft.AspNetCore.Mvc;
using Services.Implementations;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IReservationService _reservationService;

        public ReservationsController(ILogger<ReservationsController> logger, IReservationService reservationService)
        {
            _logger = logger;
            _reservationService = reservationService;
        }

        // /api/Reservations POST
        [HttpPost]
        public async Task<IActionResult> AddNewReservation(ReservationDto reservationDto)
        {
            _logger.LogInformation("Add new announcements attempt.");
            _logger.LogInformation(reservationDto.ToString());
            var createdReservation = await _reservationService.AddReservation(reservationDto);
            return Ok(createdReservation);
        }

        // /api/Reservations/{id} DELETE
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteReservation(Guid id)
        {
            _logger.LogInformation($"Delete reservation attempt. Id = '{id}'");
            var response = await _reservationService.DeleteReservation(id);
            return Ok(response);
        }
    }
}

