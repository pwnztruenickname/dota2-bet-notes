namespace DotaStatistics.Contracts;

/// <summary>
/// Контракт для получения команды
/// </summary>
public class TeamContract
{
    /// <summary>
    /// Идентификатор команды
    /// </summary>
    public long Id { get; set; }
    
    /// <summary>
    /// Наименование команды
    /// </summary>
    public string Name { get; set; }
}