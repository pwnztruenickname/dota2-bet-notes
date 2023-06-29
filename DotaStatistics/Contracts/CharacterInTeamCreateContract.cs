using Core.Enums;

namespace DotaStatistics.Contracts;

public class CharacterInTeamCreateContract
{
    public long Id { get; set; }
    
    public GameRole GameRole { get; set; }
}