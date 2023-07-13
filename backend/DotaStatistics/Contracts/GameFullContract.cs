using Core.Enums;

namespace DotaStatistics.Contracts;

public class GameFullContract
{
    public long Id { get; set; }
    
    public TeamInGameContract Radiant { get; set; }
    
    public TeamInGameContract Dire { get; set; }

    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}