using Core.Enums;

namespace Application.Dtos;

public class GameCreateDto
{
    public TeamInGameCreateDto FirstTeam { get; set; }
    
    public TeamInGameCreateDto SecondTeam { get; set; }
    
    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}