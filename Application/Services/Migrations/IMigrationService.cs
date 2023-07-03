namespace Application.Services.Migrations;

public interface IMigrationService
{
    /// <summary> Применяет миграции к базе </summary>
    Task MigrateAsync();
}