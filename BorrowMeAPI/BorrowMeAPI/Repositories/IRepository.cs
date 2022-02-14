using BorrowMeAPI.Model;
using System.Linq.Expressions;

namespace BorrowMeAPI.Repositories
{
    public interface IRepository<T> where T : EntityBase
    {
        T GetById(int id);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void Edit(T entity);
    }
    
}
