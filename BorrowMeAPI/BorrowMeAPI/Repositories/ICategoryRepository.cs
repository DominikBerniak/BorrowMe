
namespace BorrowMeAPI.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<MainCategory>> GetAllMainCategories();
        Task<MainCategory> GetMainCategoryById(Guid id);
    }
}