using Core.Repositories;
using Core.Repositories.Interfaces;
using Core.Services.Interfaces;
using Domain.Entieties;

namespace Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<User> GetUser(Guid userId)
        {
            var user = await _repository.GetUserById(userId);
            return user;
        }
    }
}
