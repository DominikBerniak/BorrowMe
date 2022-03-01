using Core.Model.DataTransferObjects;
using Core.Repositories;
using Core.Services.Interfaces;
using Domain.Entieties;

namespace Services.Implementations
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

        public async Task<IEnumerable<City>> GetAllCities()
        {
            return await _repository.GetAll();
        }
        public async Task<City> GetCityById(Guid id)
        {
            return await _repository.GetById(id);
        }
        public async Task<IEnumerable<City>> GetByName(string phrase)
        {
            return await _repository.GetAll(c => c.Name.ToLower().Contains(phrase.ToLower()));
        }

        public async Task<City> AddCity(CityDto data)
        {
            var voivodeship = await _voivodeshipRepository.GetByProperty(v => v.Name == data.VoivodeshipName);
            var city = new City
            {
                Name = data.CityName
            };
            voivodeship.Cities.Add(city);
            await _voivodeshipRepository.Edit(voivodeship);
            return city;
        }
    }
}
