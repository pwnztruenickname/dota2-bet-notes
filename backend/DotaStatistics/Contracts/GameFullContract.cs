using Core.Enums;

namespace DotaStatistics.Contracts;

public class GameFullContract
{
    public long Id { get; set; }
    
    public TeamInGameContract FirstTeam { get; set; }
    
    public TeamInGameContract SecondTeam { get; set; }

    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}