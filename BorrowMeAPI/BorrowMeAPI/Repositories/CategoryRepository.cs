using System;
namespace BorrowMeAPI.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataDbContext _context;

        public CategoryRepository(DataDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<MainCategory>> GetAllMainCategories()
        {
            return await _context.MainCategories
                .Include(mc=>mc.SubCategories)
                .ToListAsync();
        }

        public async Task<MainCategory> GetMainCategoryById(Guid id)
        {
            return await _context.MainCategories
                .Where(mc => mc.Id == id)
                .Include(mc=>mc.SubCategories)
                .FirstOrDefaultAsync();
        }
    }
}
