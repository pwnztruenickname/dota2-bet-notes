using DotaStatistics.Contracts;
using DotaStatistics.Contracts.External;
using Refit;

namespace DotaStatistics.External;

public interface IDotaOpenApiService
{
    [Get("/teams")]
    Task<IEnumerable<OpenApiTeamContract>> GetTeams();

    [Get("/heroes")]
    Task<IEnumerable<OpenApiHeroContract>> GetHeroes();
}