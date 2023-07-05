using Application.Dtos;
using Application.Services.Heroes;
using AutoMapper;
using DotaStatistics.Contracts;
using DotaStatistics.External;
using Microsoft.AspNetCore.Mvc;

namespace DotaStatistics.Controllers;

[Route("api/[Controller]")]
[ApiController]
public class HeroController: ControllerBase
{
    private readonly IHeroesService _heroesService;
    private readonly IMapper _mapper;
    private readonly IDotaOpenApiService _dotaOpenApiService;

    public HeroController(IHeroesService heroesService, IMapper mapper, IDotaOpenApiService dotaOpenApiService)
    {
        _heroesService = heroesService;
        _mapper = mapper;
        _dotaOpenApiService = dotaOpenApiService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<HeroContract>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<HeroContract>> GetCharacters()
    {
        var characterDtos = await _heroesService.GetCharacters();
        var contracts = _mapper.Map<IEnumerable<HeroContract>>(characterDtos);

        return contracts;
    }

    [HttpPut("sync")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task SyncHeroes()
    {
        var heroContracts = await _dotaOpenApiService.GetHeroes();
        var dtos = _mapper.Map<IEnumerable<OpenApiHeroDto>>(heroContracts);

        await _heroesService.Sync(dtos);
    }
    
}