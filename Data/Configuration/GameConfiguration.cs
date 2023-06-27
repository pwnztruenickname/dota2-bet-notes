using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configuration;

public class GameConfiguration : IEntityTypeConfiguration<Game>
{
    public void Configure(EntityTypeBuilder<Game> builder)
    {
        builder.ToTable("games");
        
        builder.Property(h => h.Id).UseIdentityByDefaultColumn().HasComment("Идентификатор записи");

        builder.Property(x => x.FirstTeamId).HasComment("Идентификатор пиков первой команды");
        builder.Property(x => x.SecondTeamId).HasComment("Идентификатор пиков первой команды");
        builder.Property(x => x.Comment).HasComment("Комментарий по игре");

        builder
            .HasOne(x => x.FirstTeam)
            .WithOne()
            .HasForeignKey<Game>(x => x.FirstTeamId);
        
        builder
            .HasOne(x => x.SecondTeam)
            .WithOne()
            .HasForeignKey<Game>(x => x.SecondTeamId);

        builder
            .Property(x => x.GameResult)
            .HasComment("Результат игры")
            .HasConversion<string>();
    }
}