using AutoMapper;
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
        private readonly IMapper _mapper;

        public ReservationsController(ILogger<ReservationsController> logger, IReservationService reservationService, IMapper mapper)
        {
            _logger = logger;
            _reservationService = reservationService;
            _mapper = mapper;
        }

        // /api/Reservations POST
        [HttpPost]
        public async Task<ActionResult<Reservation>> AddNewReservation(CreateReservationDto reservationDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _logger.LogInformation("Add new announcements attempt.");
            _logger.LogInformation(reservationDto.ToString());
            var createdReservation = await _reservationService.AddReservation(reservationDto);
            return Created($"/api/Reservations/{createdReservation.Id}", createdReservation);
        }

        // /api/Reservations/{id} GET
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<GetReservationDto>> GetReservationById(Guid id)
        {
            _logger.LogInformation($"Get reservation attempt. Id = '{id}'");
            var reservation = await _reservationService.GetReservationById(id);
            if (reservation is null)
            {
                return NotFound();
            }
            var reservationData = _mapper.Map<GetReservationDto>(reservation);
            return Ok(reservationData);
        }

        [HttpPatch("{id:guid}/accept")]
        public async Task<ActionResult<Reservation>> AcceptReservation(Guid id, [FromBody] bool isAccepted)
        {
            _logger.LogInformation($"Patch reservation attempt. Id = '{id}'");
            var updatedReservation = await _reservationService.UpdateIsAcceptedReservation(id, isAccepted);
            return Ok(updatedReservation);
        }

        // /api/Reservations/{id} DELETE
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<Reservation>> DeleteReservation(Guid id)
        {
            _logger.LogInformation($"Delete reservation attempt. Id = '{id}'");
            var response = await _reservationService.DeleteReservation(id);
            return Ok(response);
        }
    }
}

