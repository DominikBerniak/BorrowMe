using Domain.Entieties;

namespace Core.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(Guid userId);
    }
}
