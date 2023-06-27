using Core.Enums;

namespace Data.Model;

/// <summary>
/// Команда в игре
/// </summary>
public class TeamInGame
{
    public long Id { get; set; }
    
    public Game Game { get; set; }
    
    public long GameId { get; set; }
    
    public Team Team { get; set; }
    
    public long TeamId { get; set; }
    
    public TeamSide TeamSide { get; set; }
    
    public List<CharacterInTeam> CharactersInTeam { get; set; }
}