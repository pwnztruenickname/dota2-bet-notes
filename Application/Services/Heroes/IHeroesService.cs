using Application.Dtos;

namespace Application.Services.Heroes;

public interface IHeroesService
{
    Task<IEnumerable<HeroesDto>> GetCharacters();

    Task Sync(IEnumerable<OpenApiHeroDto> heroDtos);


}