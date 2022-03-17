using Core.Model.DataTransferObjects;
using Domain.Entieties;

namespace Core.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(Guid userId);
        Task<User> AddUser(CreateUserDto userData);
        Task<User> UpdateUser(User userData);
        Task<User> GetUser(string email);
    }
}
