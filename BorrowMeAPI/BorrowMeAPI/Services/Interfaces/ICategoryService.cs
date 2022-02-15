using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Model.Entieties;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<MainCategory>> GetAllCategories();

        Task<MainCategory> AddMainCategory(MainCategory mainCategory);
        Task<SubCategory> AddSubCategory(SubCategoryDto subCategory);
    }
}