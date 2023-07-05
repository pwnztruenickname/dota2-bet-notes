using Application.Dtos;
using Application.Services.Teams;
using AutoMapper;
using DotaStatistics.Contracts;
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

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TeamContract>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<TeamContract>> GetAll()
    {
        var teamDtos = await _teamService.GetAll();

        var contracts = _mapper.Map<IEnumerable<TeamContract>>(teamDtos);
        return contracts;
    }

}