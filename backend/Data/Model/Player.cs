using Core.Enums;

namespace Data.Model;

/// <summary>
/// Игрок
/// </summary>
public class Player
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public long Id { get; set; }
    
    /// <summary>
    /// Никнейм игрока
    /// </summary>
    public string NickName { get; set; }
    
    /// <summary>
    /// Его роль
    /// </summary>
    public GameRole GameRole { get; set; }
    
    /// <summary>
    /// Команда
    /// </summary>
    public Team Team { get; set; }
    
    /// <summary>
    /// Идентификатор команды
    /// </summary>
    public long TeamId { get; set; }
}