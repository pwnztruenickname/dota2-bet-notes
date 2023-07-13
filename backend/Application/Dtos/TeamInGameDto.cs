using Core.Enums;

namespace Application.Dtos;

public class TeamInGameDto
{
    public TeamDto Team { get; set; }

    public List<CharacterInTeamDto> CharactersInTeam { get; set; }
}