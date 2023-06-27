using Application.Dtos;
using AutoMapper;
using Data.Model;

namespace Application.Mapping;

public class TeamDtoMappingProfile : Profile
{
    public TeamDtoMappingProfile()
    {
        CreateMap<OpenApiTeamDto, Team>();
    }
}