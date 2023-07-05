namespace Data.Model;

/// <summary>
/// Персонаж
/// </summary>
public class Hero
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public long Id { get; set; }
    
    /// <summary>
    /// Название персонажа
    /// </summary>
    public string LocalizedName { get; set; }
    
    /// <summary>
    /// Наименование без пробелов для вставки картинок
    /// </summary>
    public string Name { get; set; }
}