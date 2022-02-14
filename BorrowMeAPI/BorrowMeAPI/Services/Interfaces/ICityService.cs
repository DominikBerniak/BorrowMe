using BorrowMeAPI.Model;

namespace BorrowMeAPI.Services.Interfaces
{
    public interface ICityService
    {
        IEnumerable<City> GetAllCities();
        IEnumerable<City> GetByName(string phrase);
    }
}