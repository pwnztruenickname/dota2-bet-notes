using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Heroes;

public class HeroesService: IHeroesService
{
    private readonly IMapper _mapper;
    private readonly DataContext _dataContext;

    public HeroesService(IMapper mapper, DataContext dataContext)
    {
        _mapper = mapper;
        _dataContext = dataContext;
    }

    public async Task<IEnumerable<HeroDto>> GetCharacters()
    {
        var heroes = await _dataContext.Heroes.OrderBy(x => x.LocalizedName)
            .ProjectTo<HeroDto>(_mapper.ConfigurationProvider).ToListAsync();
        
        return heroes;
    }

    public async Task Sync(IEnumerable<OpenApiHeroDto> heroDtos)
    {
        var heroes = _mapper.Map<IEnumerable<Hero>>(heroDtos);

        await _dataContext.Heroes.AddRangeAsync(heroes);
        await _dataContext.SaveChangesAsync();
    }
}