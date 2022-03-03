using Domain.Entieties;

namespace Core.Services.Interfaces
{
    public interface IVoivodeshipService
    {
        Task<IEnumerable<Voivodeship>> GetAllVoivodeships();
    }
}