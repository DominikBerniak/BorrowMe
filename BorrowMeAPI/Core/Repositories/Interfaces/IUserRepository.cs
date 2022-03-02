using Domain.Entieties;

namespace Core.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserById(Guid userId);
    }
}
