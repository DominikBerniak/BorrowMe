using BorrowMeAPI.Model;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;


namespace BorrowMeAPI.Services.Implementations
{
    public class CityService : ICityService
    {
        private readonly IRepository<City> _repository;
        public CityService(IRepository<City> repository)
        {
            _repository = repository;
        }

        public IEnumerable<City> GetAllCities()
        {
            return _repository.GetAll();
        }

        public IEnumerable<City> GetByName(string phrase)
        {
            throw new NotImplementedException();
        }

    }
}
