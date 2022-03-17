using Core.Model.DataTransferObjects;
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

        public async Task<User> GetUser(string email)
        {
            var user = await _repository.GetByProperty(u =>  u.Email == email);
            return user;
        }

        public async Task<User> AddUser(CreateUserDto userData)
        {
            var user = new User
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                Email = userData.Email,
            };
            return await _repository.Add(user);
        }

        public async Task<User> UpdateUser(User userData)
        {
            return await _repository.Edit(userData);
        }
    }
}
