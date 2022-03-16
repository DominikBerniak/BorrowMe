using AutoMapper;
using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        private readonly IMessageService _messageService;

        public MessagesController(ILogger<MessagesController> logger, IMapper mapper, IMessageService messageService)
        {
            _logger = logger;
            _mapper = mapper;
            _messageService = messageService;
        }

        [HttpGet("reservations/{reservationId}")]
        public async Task<ActionResult<GetPaginatedMessagesDto>> GetPaginatedReservationMessages(Guid reservationId, [FromQuery] int pageNumber = 1)
        {
            var messages = await _messageService.GetPaginatedReservationMessages(reservationId, pageNumber);
            if (messages.Messages.Count == 0)
            {
                return NotFound();
            }
            return Ok(messages);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<GetMessageDTO>> SetMessageAsRead(Guid id)
        {
            var updatedMessage = await _messageService.SetMessageAsRead(id);
            if (updatedMessage is null)
            {
                return NotFound();
            }
            return Ok(updatedMessage);
        }
    }
}
