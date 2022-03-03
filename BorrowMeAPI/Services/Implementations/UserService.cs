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
        private readonly IRepository<User> _genericRepository;

        public UserService(IUserRepository repository, IRepository<User> genericRepository)
        {
            _repository = repository;
            _genericRepository = genericRepository;
        }

        public async Task<User> GetUser(Guid userId)
        {
            var user = await _repository.GetUserById(userId);
            return user;
        }

        public async Task<User> AddUser(BusinessUserDto userData)
        {
            var user = new User
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                Email = userData.Email,
            };
            return await _genericRepository.Add(user);
        }
    }
}
