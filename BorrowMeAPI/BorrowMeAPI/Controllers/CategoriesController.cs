using Core.Model.DataTransferObjects;
using Core.Services.Interfaces;
using Domain.Entieties;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
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

        #region Main Categories
        [HttpGet("MainCategories")]
        public async Task<ActionResult<List<MainCategory>>> GetAllMainCategories()
        {
            var mainCategories = await _categoryService.GetAllCategories();
            return Ok(mainCategories);
        }

        [HttpGet("MainCategories/{id}")]
        public async Task<ActionResult<MainCategory>> GetMainCategoryById(Guid id)
        {
            var mainCategory = await _categoryService.GetMainCategoryById(id);
            if (mainCategory is null)
            {
                return NotFound();
            }
            return Ok(mainCategory);
        }

        [HttpPost("MainCategories")]
        public async Task<ActionResult<MainCategory>> AddMainCategory(MainCategory mainCategory)
        {
            var category = await _categoryService.AddMainCategory(mainCategory);
            return Created($"/Categories/MainCategories/{category.Id}", category);
        }
        #endregion

        #region Sub Categories
        [HttpGet("SubCategories/{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategoryById(Guid id)
        {
            var category = await _categoryService.GetSubCategoryById(id);
            if (category is null)
            {
                return NotFound();
            }
            return Ok(category);
        }
        [HttpPost("SubCategories")]
        public async Task<ActionResult<SubCategory>> AddSubCategory(SubCategoryDto subCategoryDto)
        {
            var category = await _categoryService.AddSubCategory(subCategoryDto);
            if (category is null)
            {
                return Problem("Something went horribly wrong.");
            }

            return Created($"/Categories/SubCategories/{category.Id}", category);
        }
        #endregion
    }
}
