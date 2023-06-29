using Application.Dtos;
using Application.Services.Games;
using AutoMapper;
using DotaStatistics.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DotaStatistics.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;
    private readonly IMapper _mapper;

    public GameController(IGameService gameService, IMapper mapper)
    {
        _gameService = gameService;
        _mapper = mapper;
    }

    [HttpGet("search-by-characters-setup")]
    [ProducesResponseType(typeof(IEnumerable<GameFullContract>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<GameFullContract>> SearchByCharactersSetup(
        [FromBody] GameWithCharacterSetupSearchContract searchContract)
    {
        var dto = _mapper.Map<GameWithCharacterSetupSearchDto>(searchContract);
        var gameDtos = await _gameService.GetGamesByCharactersSetup(dto);

        var contract = _mapper.Map<IEnumerable<GameFullContract>>(gameDtos);
        return contract;
    }

    [HttpPost]
    [ProducesResponseType(typeof(GameCreateContract), StatusCodes.Status200OK)]
    public async Task CreateGame([FromBody] GameCreateContract createContract)
    {
        var createDto = _mapper.Map<GameCreateDto>(createContract);
        await _gameService.Create(createDto);
    }

    [HttpGet("all")]
    [ProducesResponseType(typeof(IEnumerable<GameFullContract>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<GameFullContract>> GetAll()
    {
        var gameDtos = _gameService.GetAll();

        var contracts = _mapper.Map<IEnumerable<GameFullContract>>(gameDtos);
        return contracts;
    }

    [HttpPost("set-comment")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task SetComment([FromBody] SetGameCommentContract commentContract)
    {
        var dto = _mapper.Map<SetGameCommentDto>(commentContract);
        await _gameService.SetComment(dto);
    }
}