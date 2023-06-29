namespace Application.Dtos;

public class GameWithCharacterSetupSearchDto
{
    public long? TeamId { get; set; }
    
    public IEnumerable<long> SetupCharacterIds { get; set; }
}