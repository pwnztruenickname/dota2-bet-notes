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
    [ProducesResponseType(typeof(IEnumerable<GameSearchResultContract>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<GameSearchResultContract>> SearchByCharactersSetup(
        [FromBody] GameWithCharacterSetupSearchContract searchContract)
    {
        var dto = _mapper.Map<GameWithCharacterSetupSearchDto>(searchContract);
        var gameDtos = await _gameService.GetGamesByCharactersSetup(dto);

        var contract = _mapper.Map<IEnumerable<GameSearchResultContract>>(gameDtos);
        return contract;
    }
    
    [HttpPost("set-comment")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task SetComment(SetGameCommentContract commentContract)
    {
        await _gameService.SetComment(commentContract.Comment);
    }
}