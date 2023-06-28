using Core.Enums;

namespace Application.Dtos;

public class TeamInGameDto
{
    public TeamSide TeamSide { get; set; }
    
    public List<CharacterInTeamDto> CharactersInTeam { get; set; }
}