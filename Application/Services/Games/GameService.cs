using Application.Dtos;

namespace Application.Services.Games;

public class GameService: IGameService
{
    public Task<GameSearchResultDto> GetGamesByCharactersSetup(GameWithCharacterSetupSearchDto searchDto)
    {
        throw new NotImplementedException();
    }

    public Task SetComment(string comment)
    {
        throw new NotImplementedException();
    }
}