using System.Linq.Expressions;

namespace Application.Extensions;

public static class QueryableExtensions
{
    /// <summary>
    /// Добавляет условие Where, заложенное в предикат, при выполнении условия из condition
    /// </summary>
    public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> query, bool condition,
        Expression<Func<TSource, bool>> predicate)
    {
        return condition
            ? query.Where(predicate)
            : query;
    }
}