using Application.Dtos;
using Application.Services.TeamInGame;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Games;

public class GameService: IGameService
{
    private readonly DataContext _dataContext;
    private readonly IMapper _mapper;
    private readonly ITeamInGameService _teamInGameService;

    public GameService(DataContext dataContext, IMapper mapper, ITeamInGameService teamInGameService)
    {
        _dataContext = dataContext;
        _mapper = mapper;
        _teamInGameService = teamInGameService;
    }

    public async Task<IEnumerable<GameFullDto>> GetGamesByCharactersSetup(GameWithCharacterSetupSearchDto searchDto)
    {
        var gamesSearchQuery = _dataContext.Games.AsQueryable();
        
        var teamInGameIds = await _teamInGameService.GetTeamInGameIdsByCharacterSetup(searchDto);
        var ids = teamInGameIds.ToList();

        if (ids.Any())
            gamesSearchQuery = gamesSearchQuery
                .Where(x => ids.Contains(x.RadiantTeamId) || ids.Contains(x.DireTeamId));
        else return new List<GameFullDto>();
        
        var result = await gamesSearchQuery.ProjectTo<GameFullDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        
        return result;
    }

    public async Task SetComment(SetGameCommentDto commentDto)
    {
        if (string.IsNullOrEmpty(commentDto.Comment))
            return;
        
        var game = await _dataContext.Games.SingleOrDefaultAsync(x => x.Id == commentDto.GameId);
        
        //ToDo обработать ошибку
        if (game is null)
            return;

        game.Comment = commentDto.Comment;
        await _dataContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<GameFullDto>> GetAll()
    {
        var games = await _dataContext.Games
            .OrderByDescending(x => x.Id)
            .ProjectTo<GameFullDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return games;
    }

    public async Task Create(GameCreateDto createDto)
    {
        var game = _mapper.Map<Game>(createDto);
        
        await _dataContext.AddAsync(game);
        await _dataContext.SaveChangesAsync();
    }
}