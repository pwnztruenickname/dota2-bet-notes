using Core.Enums;

namespace Application.Dtos;

public class CharacterInTeamCreateDto
{
    public long Id { get; set; }
    
    public GameRole GameRole { get; set; }
}