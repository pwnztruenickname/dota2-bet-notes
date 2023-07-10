using Core.Enums;

namespace Application.Dtos;

public class GameCreateDto
{
    public TeamInGameCreateDto Radiant { get; set; }
    
    public TeamInGameCreateDto Dire { get; set; }
    
    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}