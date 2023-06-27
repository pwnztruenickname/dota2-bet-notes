using System.Linq.Expressions;
using AutoMapper;

namespace Core.Mapper;

public static class AutoMapperExtensions
{
    /// <summary>
    /// Производит простой маппинг одного свойства к другому
    /// </summary>
    public static IMappingExpression<TSource, TDestination> MapMember<TSource, TDestination, TSourceMember, TDestinationMember>(this IMappingExpression<TSource, TDestination> expression,
        Expression<Func<TDestination, TDestinationMember>> destinationMember, Expression<Func<TSource, TSourceMember>> sourceMember)
    {
        expression.ForMember(destinationMember, config => config.MapFrom(sourceMember));
        return expression;
    }

    /// <summary>
    /// Добавляет игнорирование свойства
    /// </summary>
    public static IMappingExpression<TSource, TDestination> IgnoreMember<TSource, TDestination, TDestinationMember>(this IMappingExpression<TSource,
        TDestination> expression, Expression<Func<TDestination, TDestinationMember>> destinationMember)
    {
        return expression.ForMember(destinationMember, o => o.Ignore());
    }
}