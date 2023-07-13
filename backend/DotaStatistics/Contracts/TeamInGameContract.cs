using Core.Enums;

namespace DotaStatistics.Contracts;

public class TeamInGameContract
{
    public TeamContract Team { get; set; }

    public List<CharacterInTeamContract> CharactersInTeam { get; set; }
}