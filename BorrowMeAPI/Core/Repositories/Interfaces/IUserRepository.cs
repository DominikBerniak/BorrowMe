using Domain.Entieties;

namespace Core.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetUserById(Guid userId);
    }
}
