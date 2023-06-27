using Application.Dtos;
using AutoMapper;
using Core.Mapper;
using Data.Model;

namespace Application.Mapping;

public class HeroDtoMappingProfile : Profile
{
    public HeroDtoMappingProfile()
    {
        CreateMap<OpenApiHeroDto, Hero>()
            .IgnoreMember(x => x.Id)
            .MapMember(x => x.Name, x => x.Name.Replace("npc_dota_hero_", ""));
    }
}