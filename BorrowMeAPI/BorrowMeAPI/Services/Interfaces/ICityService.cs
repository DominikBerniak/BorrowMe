using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface ICityService
    {
        Task<IEnumerable<City>> GetAllCities();
        Task<IEnumerable<City>> GetByName(string phrase);
    }
}