using Application.Dtos;
using AutoMapper;
using Data;
using Data.Model;

namespace Application.Services.Teams;

public class TeamService : ITeamService
{
    private readonly IMapper _mapper;
    private readonly DataContext _dataContext;

    public TeamService(IMapper mapper, DataContext dataContext)
    {
        _mapper = mapper;
        _dataContext = dataContext;
    }

    public async Task SyncTeams(IEnumerable<OpenApiTeamDto> teamDtos)
    {
        var teams = _mapper.Map<IEnumerable<Team>>(teamDtos);

        await _dataContext.Teams.AddRangeAsync(teams);
        await _dataContext.SaveChangesAsync();
    }
}