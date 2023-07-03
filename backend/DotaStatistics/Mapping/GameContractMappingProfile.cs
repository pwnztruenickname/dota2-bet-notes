using Application.Dtos;
using AutoMapper;
using DotaStatistics.Contracts;

namespace DotaStatistics.Mapping;

public class GameContractMappingProfile: Profile
{
    public GameContractMappingProfile()
    {
        CreateMap<GameFullDto, GameFullContract>();
        CreateMap<TeamInGameDto, TeamInGameContract>();
        CreateMap<CharacterInTeamDto, CharacterInTeamContract>();
        
        CreateMap<GameWithCharacterSetupSearchContract, GameWithCharacterSetupSearchDto>();
        
        CreateMap<GameCreateContract, GameCreateDto>();
        CreateMap<TeamInGameCreateContract, TeamInGameCreateDto>();
        CreateMap<CharacterInTeamCreateContract, CharacterInTeamCreateDto>();
    }
}