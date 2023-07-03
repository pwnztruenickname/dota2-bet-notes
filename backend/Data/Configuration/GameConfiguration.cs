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
        builder.HasKey(h => h.Id);

        builder.Property(x => x.FirstTeamId).HasComment("Идентификатор пиков первой команды");
        builder.Property(x => x.SecondTeamId).HasComment("Идентификатор пиков первой команды");
        builder.Property(x => x.Comment).HasComment("Комментарий по игре");

        builder
            .HasOne(x => x.FirstTeam)
            .WithMany()
            .HasForeignKey(x => x.FirstTeamId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder
            .HasOne(x => x.SecondTeam)
            .WithMany()
            .HasForeignKey(x => x.SecondTeamId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .Property(x => x.GameResult)
            .HasComment("Результат игры")
            .HasConversion<string>();
    }
}