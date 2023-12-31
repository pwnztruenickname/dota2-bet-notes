using Core.Enums;

namespace Application.Dtos;

public class TeamInGameCreateDto
{
    public long TeamId { get; set; }

    public IEnumerable<CharacterInTeamCreateDto> CharactersInTeam { get; set; }
}