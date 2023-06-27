using Application.Dtos;
using Application.Services.Teams;
using AutoMapper;
using DotaStatistics.External;
using Microsoft.AspNetCore.Mvc;

namespace DotaStatistics.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class TeamController: ControllerBase
{
    private readonly IDotaOpenApiService _dotaOpenApiService;
    private readonly ITeamService _teamService;
    private readonly IMapper _mapper;

    public TeamController(IDotaOpenApiService dotaOpenApiService, ITeamService teamService, IMapper mapper)
    {
        _dotaOpenApiService = dotaOpenApiService;
        _teamService = teamService;
        _mapper = mapper;
    }

    [HttpPut("sync")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task SyncTeams()
    {
        var teamContracts = await _dotaOpenApiService.GetTeams();
        var dtos = _mapper.Map<IEnumerable<OpenApiTeamDto>>(teamContracts);

        await _teamService.SyncTeams(dtos);
    }
}