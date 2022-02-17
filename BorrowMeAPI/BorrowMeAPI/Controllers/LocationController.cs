using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Services.Implementations;
using BorrowMeAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BorrowMeAPI.Controllers
{
    [ApiController]
    public class LocationController : ControllerBase
    {

        private readonly ILogger _logger;
        private readonly ICityService _cityService;
        private readonly IVoivodeshipService _voivodeshipService;

        public LocationController(ILogger<LocationController> logger, ICityService cityService, IVoivodeshipService voivodeshipService)
        {
            _logger = logger;
            _cityService = cityService;
            _voivodeshipService = voivodeshipService;
        }

        #region Voivodeships
        [HttpGet("Voivodeships")]
        public async Task<ActionResult<Voivodeship>> GetAllVoivodeships()
        {
            var voivodeships = await _voivodeshipService.GetAllVoivodeships();
            return Ok(voivodeships);
        }


        #endregion

        #region Cities
        [HttpGet("Cities")]
        public async Task<ActionResult<City>> GetAllCities()
        {
            var cities = await _cityService.GetAllCities();
            return Ok(cities);
        }

        [HttpGet("Cities/{id}")]
        public async Task<ActionResult<City>> GetCityById(Guid id)
        {
            var city = await _cityService.GetCityById(id);
            if (city is null)
            {
                return NotFound();
            }
            return Ok(city);
        }

        [HttpGet("Cities/Search/{searchCity}")]
        public async Task<ActionResult<City>> GetCitiesByName(string searchCity)
        {
            var cities = await _cityService.GetByName(searchCity);
            if (cities.Count() == 0)
            {
                return NotFound("No cities matched your criteria.");
            }
            return Ok(cities);
        }

        [HttpPost("Cities")]
        public async Task<ActionResult<City>> AddCity(CityDto data)
        {
            var city = await _cityService.AddCity(data);
            return Created($"/Cities/{city.Id}", city);
        }
        #endregion
    }
}
