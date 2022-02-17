using BorrowMeAPI.Model.Entieties;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<MainCategory> _mainCategoryGeneralRpository;
        private readonly IRepository<SubCategory> _subCategoryGeneralRpository;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(IRepository<MainCategory> mainCategoryRpository, IRepository<SubCategory> subCategoryRpository, ICategoryRepository categoryRepository)
        {
            _mainCategoryGeneralRpository = mainCategoryRpository;
            _subCategoryGeneralRpository = subCategoryRpository;
            _categoryRepository = categoryRepository;
        }
        public async Task<IEnumerable<MainCategory>> GetAllCategories()
        {
            return await _categoryRepository.GetAllMainCategories();
        }
        public async Task<MainCategory> GetMainCategoryById(Guid id)
        {
            return await _categoryRepository.GetMainCategoryById(id);
        }
        public async Task<MainCategory> AddMainCategory(MainCategory mainCategory)
        {
            return await _mainCategoryGeneralRpository.Add(mainCategory);
        }

        public async Task<SubCategory> GetSubCategoryById(Guid id)
        {
            return await _subCategoryGeneralRpository.GetById(id);
        }
        public async Task<SubCategory> AddSubCategory(SubCategoryDto subCategoryDto)
        {
            var mainCategory = await _mainCategoryGeneralRpository.GetByProperty(mc => mc.Name == subCategoryDto.MainCategoryName);
            var subCateogory = new SubCategory
            {
                Name = subCategoryDto.SubCategoryName
            };

            mainCategory.SubCategories.Add(subCateogory);
            await _mainCategoryGeneralRpository.Edit(mainCategory);
            return subCateogory;
        }
    }
}