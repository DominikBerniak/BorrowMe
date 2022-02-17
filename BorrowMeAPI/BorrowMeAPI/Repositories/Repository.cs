using BorrowMeAPI.Repositories;
using System.Linq.Expressions;

public class Repository<T> : IRepository<T> where T : EntityBase
{
    private readonly DataDbContext _dbContext;
    public Repository(DataDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    public virtual async Task<T> GetById(Guid id)
    {
        return await _dbContext.Set<T>().FindAsync(id);
    }
    public virtual async Task<IEnumerable<T>> GetAll()
    {
        return await _dbContext.Set<T>().ToListAsync();
    }
    public virtual async Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> predicate)
    {
        return await _dbContext.Set<T>()
               .Where(predicate)
               .ToListAsync();
    }

    public virtual async Task<T> GetByProperty(Expression<Func<T, bool>> predicate)
    {
        return await _dbContext.Set<T>()
               .Where(predicate)
               .FirstOrDefaultAsync();
    }

    public async Task<T> Add(T entity)
    {
        await _dbContext.Set<T>().AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
    public async Task<T> Edit(T entity)
    {
        _dbContext.Update(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
    public async Task<T> Delete(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }
}