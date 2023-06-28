using Application.Dtos;

namespace Application.Services.Heroes;

public interface IHeroesService
{
    Task<IEnumerable<HeroDto>> GetCharacters();

    Task Sync(IEnumerable<OpenApiHeroDto> heroDtos);


}