using Domain.Entieties;

namespace Core.Repositories
{
    public interface IVoivodeshipRepository
    {
        Task<IEnumerable<Voivodeship>> GetAll();
    }
}