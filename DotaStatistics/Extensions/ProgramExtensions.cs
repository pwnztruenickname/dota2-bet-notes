using Application.Services.Games;
using Application.Services.Heroes;
using Application.Services.Migrations;
using Application.Services.TeamInGame;
using Application.Services.Teams;
using Data;
using DotaStatistics.External;
using Microsoft.EntityFrameworkCore;
using Refit;

namespace DotaStatistics.Extensions;

public static class ProgramExtensions
{
    public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Postgres");
            
        services.AddDbContext<DataContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });
    }

    public static void AddRefit(this IServiceCollection service)
    {
        service.AddRefitClient<IDotaOpenApiService>()
            .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://api.opendota.com/api"));
    }
    
    public static void AddApplicationServices(this IServiceCollection service)
    {
        service
            .AddTransient<ITeamInGameService, TeamInGameService>()
            .AddTransient<IGameService, GameService>()
            .AddTransient<IHeroesService, HeroesService>()
            .AddTransient<ITeamService, TeamService>()
            .AddTransient<IMigrationService, MigrationService>()
            ;
    }
}