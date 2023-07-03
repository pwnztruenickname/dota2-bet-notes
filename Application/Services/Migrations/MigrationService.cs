using Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Migrations;

public class MigrationService : IMigrationService
{
    private readonly DataContext _context;

    public MigrationService(DataContext context)
    {
        _context = context;
    }

    public async Task MigrateAsync()
    {
        Console.WriteLine($"{DateTime.Now:HH:mm:ss} Running migration...");

        await _context.Database.MigrateAsync();

        Console.WriteLine($"{DateTime.Now:HH:mm:ss} Migration completed");
    }
}