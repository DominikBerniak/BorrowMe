using BorrowMeAPI.Model.DataTransferObjects;
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
            var cities = await _cityService.GetAllCities();
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCityById(Guid id)
        {
            var city = await _cityService.GetCityById(id);
            if (city is null)
            {
                return NotFound();
            }
            return Ok(city);
        }

        [HttpGet("search/{searchCity}")]
        public async Task<ActionResult<City>> GetCitiesByName(string searchCity)
        {
            var cities = await _cityService.GetByName(searchCity);
            if (cities.Count() == 0)
            {
                return NotFound("No cities matched your criteria.");
            }
            return Ok(cities);
        }

        [HttpPost]
        public async Task<ActionResult<City>> AddCity(CityDto data)
        {
            var city = await _cityService.AddCity(data);
            return Created($"/Cities/{city.Id}", city);
        }

    }
}
