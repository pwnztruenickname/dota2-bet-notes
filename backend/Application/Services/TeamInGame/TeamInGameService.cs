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

    public async Task<IEnumerable<long>> GetTeamInGameIdsByCharacterSetup(GameWithCharacterSetupSearchDto setupSearchDto)
    {
        var test = _dataContext.TeamInGames.WhereIf(setupSearchDto.TeamId.HasValue,
            x => x.TeamId == setupSearchDto.TeamId);

        if(setupSearchDto.SetupCharacterIds.Any())
            foreach (var characterId in setupSearchDto.SetupCharacterIds)
                test = test.Where(x => x.CharactersInTeam.Select(cit => cit.CharacterId).Contains(characterId));

        var teamInGameId = await test.Select(x => x.Id).ToListAsync();
        return teamInGameId;
    }
}