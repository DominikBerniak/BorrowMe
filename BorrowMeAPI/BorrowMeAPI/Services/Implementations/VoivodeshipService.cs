using BorrowMeAPI.Repositories;
using System;

namespace BorrowMeAPI.Services.Implementations
{
    public class VoivodeshipService : IVoivodeshipService
    {
        private readonly IVoivodeshipRepository _repository;
        public VoivodeshipService(IVoivodeshipRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Voivodeship>> GetAllVoivodeships()
        {
            return await _repository.GetAll();
        }
    }
}
