using System;
namespace BorrowMeAPI.Repositories
{
    public class VoivodeshipRepository : IVoivodeshipRepository
    {
        private readonly DataDbContext _context;

        public VoivodeshipRepository(DataDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Voivodeship>> GetAll()
        {
            return await _context.Voivodeships
                .Include(v => v.Cities)
                .ToListAsync();
        }
    }
}
