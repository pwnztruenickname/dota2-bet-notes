using Core.Enums;

namespace DotaStatistics.Contracts;

public class GameCreateContract
{
    public TeamInGameCreateContract Radiant { get; set; }
    
    public TeamInGameCreateContract Dire { get; set; }
    
    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}