using Core.Enums;

namespace DotaStatistics.Contracts;

public class CharacterInTeamContract
{
    public long Id { get; set; }
    
    public GameRole GameRole { get; set; }
    
    public HeroContract Hero { get; set; }
    
    public long CharacterId { get; set; }
    
    public long TeamInGameId { get; set; }
}