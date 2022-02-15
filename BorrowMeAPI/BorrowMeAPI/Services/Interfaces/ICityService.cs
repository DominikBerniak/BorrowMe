using BorrowMeAPI.Model;
using BorrowMeAPI.Model.DataTransferObjects;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface ICityService
    {
        Task<IEnumerable<City>> GetAllCities();
        Task<IEnumerable<City>> GetByName(string phrase);
        Task<City> AddCity(CityDto data);
    }
}