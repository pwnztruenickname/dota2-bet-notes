using Application.Dtos;
using AutoMapper;
using Core.Mapper;
using Data.Model;

namespace Application.Mapping;

public class GameDtoMappingProfile : Profile
{
    public GameDtoMappingProfile()
    {
        CreateMap<Game, GameFullDto>();
        CreateMap<TeamInGame, TeamInGameDto>();
        CreateMap<CharacterInTeam, CharacterInTeamDto>();

        CreateMap<GameCreateDto, Game>();
        CreateMap<TeamInGameCreateDto, TeamInGame>();
        CreateMap<CharacterInTeamCreateDto, CharacterInTeam>()
            .MapMember(x => x.CharacterId, x => x.Id);
    }
}