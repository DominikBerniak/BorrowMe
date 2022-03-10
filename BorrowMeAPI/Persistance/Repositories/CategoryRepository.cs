using Core.Repositories;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories
{
    public class CategoryRepository : Repository<MainCategory>, ICategoryRepository
    {

        public CategoryRepository(DataDbContext context)
            : base(context)
        {
        }
        public async Task<IEnumerable<MainCategory>> GetAllMainCategories()
        {
            return await _dbContext.MainCategories
                .Include(mc=>mc.SubCategories)
                .ToListAsync();
        }

        public async Task<MainCategory> GetMainCategoryById(Guid id)
        {
            return await _dbContext.MainCategories
                .Where(mc => mc.Id == id)
                .Include(mc=>mc.SubCategories)
                .FirstOrDefaultAsync();
        }
    }
}
