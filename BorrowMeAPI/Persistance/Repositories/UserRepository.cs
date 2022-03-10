using Core.Model.DataTransferObjects;
using Core.Repositories.Interfaces;
using Domain.Entieties;
using Microsoft.EntityFrameworkCore;

namespace Persistance.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {

        public UserRepository(DataDbContext context)
            : base(context)
        {
        }
        public async Task<User> GetUserById(Guid userId)
        {
            var user = await _dbContext.Users
                .Include(u=>u.PictureLocation)
                .Where(u=>u.Id == userId).FirstOrDefaultAsync();
            return user;
        }
    }
}
