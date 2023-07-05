using Core.Enums;

namespace DotaStatistics.Contracts;

public class GameCreateContract
{
    public TeamInGameCreateContract FirstTeam { get; set; }
    
    public TeamInGameCreateContract SecondTeam { get; set; }
    
    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}