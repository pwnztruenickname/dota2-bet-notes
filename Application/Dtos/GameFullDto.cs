using Core.Enums;

namespace Application.Dtos;

public class GameFullDto
{
    public long Id { get; set; }
    
    public TeamInGameDto FirstTeam { get; set; }
    
    public TeamInGameDto SecondTeam { get; set; }

    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}