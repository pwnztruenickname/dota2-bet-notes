using Core.Enums;

namespace DotaStatistics.Contracts;

public class TeamInGameCreateContract
{
    public long TeamId { get; set; }

    public IEnumerable<CharacterInTeamCreateContract> CharactersInTeam { get; set; }
}