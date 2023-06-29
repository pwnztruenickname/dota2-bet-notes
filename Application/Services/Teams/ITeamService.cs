using Application.Dtos;

namespace Application.Services.Teams;

public interface ITeamService
{
    Task SyncTeams(IEnumerable<OpenApiTeamDto> teamDtos);

    Task<IEnumerable<TeamDto>> GetAll();
}