using Core.Model.DataTransferObjects;
using Core.Repositories;
using Core.Services.Interfaces;
using Domain.Entieties;

namespace Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<MainCategory> _mainCategoryGeneralRepository;
        private readonly IRepository<SubCategory> _subCategoryGeneralRepository;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(IRepository<MainCategory> mainCategoryRepository, IRepository<SubCategory> subCategoryRepository, ICategoryRepository categoryRepository)
        {
            _mainCategoryGeneralRepository = mainCategoryRepository;
            _subCategoryGeneralRepository = subCategoryRepository;
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
            return await _mainCategoryGeneralRepository.Add(mainCategory);
        }

        public async Task<SubCategory> GetSubCategoryById(Guid id)
        {
            return await _subCategoryGeneralRepository.GetById(id);
        }
        public async Task<SubCategory> AddSubCategory(SubCategoryDto subCategoryDto)
        {
            var mainCategory = await _mainCategoryGeneralRepository.GetByProperty(mc => mc.Name == subCategoryDto.MainCategoryName);
            var subCateogory = new SubCategory
            {
                Name = subCategoryDto.SubCategoryName
            };

            mainCategory.SubCategories.Add(subCateogory);
            await _mainCategoryGeneralRepository.Edit(mainCategory);
            return subCateogory;
        }
    }
}