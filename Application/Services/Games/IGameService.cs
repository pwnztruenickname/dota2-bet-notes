using Application.Dtos;

namespace Application.Services.Games;

public interface IGameService
{
    Task<GameSearchResultDto> GetGamesByCharactersSetup(GameWithCharacterSetupSearchDto searchDto);

    Task SetComment(string comment);
}