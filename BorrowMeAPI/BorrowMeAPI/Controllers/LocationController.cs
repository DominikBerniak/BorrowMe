using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
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
        public async Task<ActionResult<List<CityDto>>> GetCitiesByName(string searchCity)
        {
            var allVoivodeships = await _voivodeshipService.GetAllVoivodeships();
            var filteredVoivodeships = allVoivodeships.Where(v=>v.Cities.Any(c=>c.Name.ToLower().Contains(searchCity.ToLower()))).ToList();
            var cityData = new List<CityDto>();
            foreach (var voivodeship in filteredVoivodeships)
            {
                var cities = voivodeship.Cities.Where(c => c.Name.ToLower().Contains(searchCity.ToLower())).ToList();
                foreach (var city in cities)
                {
                    cityData.Add(new CityDto
                    {
                        VoivodeshipName = voivodeship.Name,
                        CityName = city.Name
                    });
                }
            }
            return Ok(cityData);
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
