using BorrowMeAPI.Model;
using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;

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

        [HttpGet()]
        public async Task<ActionResult<City>> GetAllCities()
        {
            return Ok(await _cityService.GetAllCities());
        }

        [HttpGet("{searchCity}")]
        public async Task<ActionResult<City>> GetCitiesByName(string searchCity)
        {
            return Ok(await _cityService.GetByName(searchCity)); // Not implemented
        }

        [HttpPost]
        public async Task<ActionResult<City>> AddCity(CityDto data)
        {
            var city = await _cityService.AddCity(data);
            return Created($"/Cities/{city.Id}", city);
        }

    }
}
