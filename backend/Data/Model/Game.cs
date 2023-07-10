
using Core.Enums;

namespace Data.Model;

/// <summary>
/// Игра
/// </summary>
public class Game
{
    public long Id { get; set; }

    public TeamInGame Radiant { get; set; }
    
    public long RadiantTeamId { get; set; }
    
    public TeamInGame Dire { get; set; }
    
    public long DireTeamId { get; set; }
    
    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}