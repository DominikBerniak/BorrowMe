using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Model.Entieties;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<MainCategory> _mainCategoryRpository;

        public CategoryService(IRepository<MainCategory> mainCategoryRpository)
        {
            _mainCategoryRpository = mainCategoryRpository;
        }
        public async Task<IEnumerable<MainCategory>> GetAllCategories()
        {
            return await _mainCategoryRpository.GetAll();
        }
        public async Task<MainCategory> AddMainCategory(MainCategory mainCategory)
        {
            return await _mainCategoryRpository.Add(mainCategory);
        }

        public async Task<SubCategory> AddSubCategory(SubCategoryDto subCategoryDto)
        {
            var mainCategory = await _mainCategoryRpository.GetByProperty(mc => mc.Name == subCategoryDto.MainCategoryName);
            var subCateogory = new SubCategory
            {
                Name = subCategoryDto.SubCategoryName
            };

            mainCategory.SubCategories.Add(subCateogory);
            await _mainCategoryRpository.Edit(mainCategory);
            return subCateogory;
        }
    }
}