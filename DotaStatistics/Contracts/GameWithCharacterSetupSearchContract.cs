namespace DotaStatistics.Contracts;

public class GameWithCharacterSetupSearchContract
{
    public long? TeamId { get; set; }
    
    public IEnumerable<long> SetupCharacterIds { get; set; }
}