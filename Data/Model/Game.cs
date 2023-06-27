
using Core.Enums;

namespace Data.Model;

/// <summary>
/// Игра
/// </summary>
public class Game
{
    public long Id { get; set; }
    
    public TeamInGame FirstTeam { get; set; }
    
    public long FirstTeamId { get; set; }
    
    public TeamInGame SecondTeam { get; set; }
    
    public long SecondTeamId { get; set; }
    
    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}