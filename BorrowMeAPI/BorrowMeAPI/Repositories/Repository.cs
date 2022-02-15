using BorrowMeAPI.Model;
using BorrowMeAPI.Repositories;

public class Repository<T> : IRepository<T> where T : EntityBase
{
    private readonly DataDbContext _dbContext;
    public Repository(DataDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public virtual T GetById(int id)
    {
        return _dbContext.Set<T>().Find(id);
    }
    public virtual IEnumerable<T> GetAll()
    {
        return _dbContext.Set<T>().AsEnumerable();
    }
    public virtual IEnumerable<T> GetAll(System.Linq.Expressions.Expression<Func<T, bool>> predicate)
    {
        return _dbContext.Set<T>()
               .Where(predicate)
               .AsEnumerable();
    }
    public async Task<T> Add(T entity)
    {
        await _dbContext.Set<T>().AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
    public void Edit(T entity)
    {
        _dbContext.Entry(entity).State = EntityState.Modified;
        _dbContext.SaveChanges();
    }
    public void Delete(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
        _dbContext.SaveChanges();
    }
}