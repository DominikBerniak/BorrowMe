using BorrowMeAPI.Model;
using BorrowMeAPI.Model.DataTransferObjects;
using BorrowMeAPI.Repositories;
using BorrowMeAPI.Services.Interfaces;
using System.Xml.Linq;

namespace BorrowMeAPI.Services.Implementations
{
    public class CityService : ICityService
    {
        private readonly IRepository<City> _repository;
        private readonly IRepository<Voivodeship> _voivodeshipRepository;

        public CityService(IRepository<City> repository, IRepository<Voivodeship> voivodeshipRepository)
        {
            _repository = repository;
            _voivodeshipRepository = voivodeshipRepository;
        }

        public async Task<City> AddCity(CityDto data)
        {
            var voivodeship = await _voivodeshipRepository.GetByProperty(v=>v.Name == data.VoivodeshipName);
            var city = new City
            {
                Name = data.CityName,
                Voivodeship = voivodeship
            };
            await _repository.Add(city);
            return city;
        }

        public async Task<IEnumerable<City>> GetAllCities()
        {
            return await _repository.GetAll();
        }

        public async Task<IEnumerable<City>> GetByName(string phrase)
        {
            return await _repository.GetAll(c => c.Name.ToLower().Contains(phrase.ToLower()));
        }

    }
}
