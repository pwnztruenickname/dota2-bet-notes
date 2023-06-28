using Application.Dtos;
using Application.Extensions;
using Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.TeamInGame;

public class TeamInGameService: ITeamInGameService
{
    private readonly DataContext _dataContext;

    public TeamInGameService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<IEnumerable<long>> GetGameIdsByCharacterSetup(GameWithCharacterSetupSearchDto setupSearchDto)
    {
        var test = _dataContext.TeamInGames.WhereIf(setupSearchDto.TeamId.HasValue,
            x => x.TeamId == setupSearchDto.TeamId);

        foreach (var characterId in setupSearchDto.SetupCharacterIds)
            test = test.Where(x => x.CharactersInTeam.Select(cit => cit.CharacterId).Contains(characterId));

        var gameIds = await test.Select(x => x.GameId).ToListAsync();
        return gameIds;
    }
    
    // husk sniper mk ck pudge    vs    p1 p2 p3 p4 p5        mk ck vs p1 p3
}