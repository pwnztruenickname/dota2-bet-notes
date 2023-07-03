using Application.Dtos;

namespace Application.Services.Games;

public interface IGameService
{
    Task<IEnumerable<GameFullDto>> GetGamesByCharactersSetup(GameWithCharacterSetupSearchDto searchDto);

    Task SetComment(SetGameCommentDto commentDto);

    Task<IEnumerable<GameFullDto>> GetAll();

    Task Create(GameCreateDto createDto);
}