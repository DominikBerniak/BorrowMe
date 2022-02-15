using BorrowMeAPI.Model;
using System.Linq.Expressions;

namespace BorrowMeAPI.Repositories
{
    public interface IRepository<T> where T : EntityBase
    {
        Task<T> GetById(int id);
        Task<IEnumerable<T>> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate);
        Task<T> Add(T entity);
        Task<T> Delete(T entity);
        Task<T> Edit(T entity);
    }
    
}
