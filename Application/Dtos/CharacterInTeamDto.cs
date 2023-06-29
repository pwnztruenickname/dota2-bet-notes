using Core.Enums;

namespace Application.Dtos;

public class CharacterInTeamDto
{
    public long Id { get; set; }
    
    public GameRole GameRole { get; set; }
    
    public HeroDto Hero { get; set; }
    
    public long CharacterId { get; set; }
    
    public long TeamInGameId { get; set; }
}