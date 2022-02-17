
namespace BorrowMeAPI.Services.Implementations
{
    public interface IVoivodeshipService
    {
        Task<IEnumerable<Voivodeship>> GetAllVoivodeships();
    }
}