using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface ICategoryService
    {
        IEnumerable<MainCategory> GetAllCategories();
    }
}