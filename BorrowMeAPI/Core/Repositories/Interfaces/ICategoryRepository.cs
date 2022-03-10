using Domain.Entieties;

namespace Core.Repositories
{
    public interface ICategoryRepository : IRepository<MainCategory>
    {
        Task<IEnumerable<MainCategory>> GetAllMainCategories();
        Task<MainCategory> GetMainCategoryById(Guid id);
    }
}