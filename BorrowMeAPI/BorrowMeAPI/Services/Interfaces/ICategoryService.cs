using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<MainCategory>> GetAllCategories();
    }
}