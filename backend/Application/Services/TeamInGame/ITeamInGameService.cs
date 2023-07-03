using Application.Dtos;

namespace Application.Services.TeamInGame;

public interface ITeamInGameService
{
    Task<IEnumerable<long>> GetGameIdsByCharacterSetup(GameWithCharacterSetupSearchDto setupSearchDto);
}