using Application.Dtos;
using AutoMapper;
using DotaStatistics.Contracts;
using DotaStatistics.Contracts.External;

namespace DotaStatistics.Mapping;

public class TeamContractMappingProfile : Profile
{
    public TeamContractMappingProfile()
    {
        CreateMap<OpenApiTeamContract, OpenApiTeamDto>();
        CreateMap<TeamDto, TeamContract>();
    }
    
}