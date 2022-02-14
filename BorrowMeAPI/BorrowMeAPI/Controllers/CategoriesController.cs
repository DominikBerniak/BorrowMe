using BorrowMeAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly ICategoryService _categoryService;

        public CategoriesController(ILogger<CategoriesController> logger, ICategoryService categoryService)
        {
            _logger = logger;
            _categoryService = categoryService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(_categoryService.GetAllCategories());
        }
    }
}
