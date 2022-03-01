using Domain.Entieties;

namespace Core.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<MainCategory>> GetAllMainCategories();
        Task<MainCategory> GetMainCategoryById(Guid id);
    }
}