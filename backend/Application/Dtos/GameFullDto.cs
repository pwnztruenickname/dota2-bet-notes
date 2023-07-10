using Core.Enums;

namespace Application.Dtos;

public class GameFullDto
{
    public long Id { get; set; }
    
    public TeamInGameDto Radiant { get; set; }
    
    public TeamInGameDto Dire { get; set; }

    public string Comment { get; set; }
    
    public GameResult? GameResult { get; set; }
}