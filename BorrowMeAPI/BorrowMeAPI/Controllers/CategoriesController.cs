using BorrowMeAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BorrowMeAPI.Services.Interfaces;
using System;
using BorrowMeAPI.Model.Entieties;
using BorrowMeAPI.Model.DataTransferObjects;

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

        #region Main Categories
        [HttpGet("MainCategories")]
        public async Task<ActionResult<List<MainCategory>>> GetAllMainCategories()
        {
            var mainCategories = await _categoryService.GetAllCategories();
            return Ok(mainCategories);
        }

        [HttpPost("MainCategories")]
        public async Task<ActionResult<MainCategory>> AddMainCategory(MainCategory mainCategory)
        {
            var category = await _categoryService.AddMainCategory(mainCategory);
            if (category is null)
            {
                return Problem("Something went horribly wrong.");
            }

            return Created($"/Categories/MainCategories/{category.Id}", category);
        }
        #endregion

        #region Sub Categories
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
