using Core.Enums;

namespace DotaStatistics.Contracts;

public class TeamInGameContract
{
    public TeamSide TeamSide { get; set; }
    
    public List<CharacterInTeamContract> CharactersInTeam { get; set; }
}