using BorrowMeAPI.Model;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;

namespace BorrowMeAPI.Services.Implementations
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<MainCategory> _repository;
        public CategoryService(IRepository<MainCategory> repository)
        {
            _repository = repository;
        }
        public IEnumerable<MainCategory> GetAllCategories()
        {
            return _repository.GetAll();
        }
    }
}
