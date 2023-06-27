using Core.Enums;

namespace Data.Model;

/// <summary>
/// Персонаж в конкретном пике
/// </summary>
public class CharacterInTeam
{
    public long Id { get; set; }
    
    public GameRole GameRole { get; set; }
    
    public Hero Hero { get; set; }
    
    public long CharacterId { get; set; }
    
    public long TeamInGameId { get; set; }
}