using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using Data.Model;
using Microsoft.EntityFrameworkCore;

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

    public async Task<IEnumerable<TeamDto>> GetAll()
    {
        var teamDtos = await _dataContext.Teams.ProjectTo<TeamDto>(_mapper.ConfigurationProvider).ToListAsync();
        return teamDtos;
    }
}