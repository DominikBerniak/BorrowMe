using BorrowMeAPI.Model;
using BorrowMeAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {

        private readonly ILogger _logger;
        private readonly ICityService _cityService;

        public CitiesController(ILogger<CitiesController> logger, ICityService cityService)
        {
            _logger = logger;
            _cityService = cityService;
        }
        
        [HttpGet]
        public async Task<ActionResult<City>> GetAllCities()
        {
            return Ok(_cityService.GetAllCities());
        }

        [HttpGet("{searchCity}")]
        public async Task<ActionResult<City>> GetCitiesByName(string searchCity)
        {
            return Ok(_cityService.GetByName(searchCity)); // Not implemented
        }

    }
}
