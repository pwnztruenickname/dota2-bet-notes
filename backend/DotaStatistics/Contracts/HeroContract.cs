namespace DotaStatistics.Contracts;

public class HeroContract
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Название персонажа
    /// </summary>
    public string LocalizedName { get; set; } = string.Empty;
    
    /// <summary>
    /// Наименование без пробелов для вставки картинок
    /// </summary>
    public string Name { get; set; } = string.Empty;
}