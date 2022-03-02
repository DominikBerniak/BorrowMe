using Core.Model.DataTransferObjects;
using Core.Repositories.Interfaces;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataDbContext _context;

        public UserRepository(DataDbContext context)
        {
            _context = context;
        }
        public async Task<User> GetUserById(Guid userId)
        {
            var user = await _context.Users
                .Include(u=>u.PictureLocation)
                .Where(u=>u.Id == userId).FirstOrDefaultAsync();
            return user;
        }
    }
}
