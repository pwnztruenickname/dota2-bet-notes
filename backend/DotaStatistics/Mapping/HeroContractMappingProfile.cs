using Application.Dtos;
using AutoMapper;
using Core.Mapper;
using DotaStatistics.Contracts;
using DotaStatistics.Contracts.External;

namespace DotaStatistics.Mapping;

public class HeroContractMappingProfile : Profile
{
    public HeroContractMappingProfile()
    {
        CreateMap<OpenApiHeroContract, OpenApiHeroDto>()
            .MapMember(x => x.LocalizedName, x => x.Localized_Name);

        CreateMap<HeroDto, HeroContract>();
    }
}