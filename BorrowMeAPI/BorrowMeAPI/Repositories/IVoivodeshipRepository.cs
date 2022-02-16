
namespace BorrowMeAPI.Repositories
{
    public interface IVoivodeshipRepository
    {
        Task<IEnumerable<Voivodeship>> GetAll();
    }
}