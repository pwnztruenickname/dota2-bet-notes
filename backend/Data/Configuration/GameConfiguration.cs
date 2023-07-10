using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configuration;

public class GameConfiguration : IEntityTypeConfiguration<Game>
{
    public void Configure(EntityTypeBuilder<Game> builder)
    {
        builder.ToTable("games");
        
        builder.Property(h => h.Id).ValueGeneratedOnAdd().UseIdentityColumn().IsRequired();

        builder.Property(x => x.RadiantTeamId).HasComment("Идентификатор пиков первой команды");
        builder.Property(x => x.DireTeamId).HasComment("Идентификатор пиков первой команды");
        builder.Property(x => x.Comment).HasComment("Комментарий по игре");

        builder
            .HasOne(x => x.Radiant)
            .WithMany()
            .HasForeignKey(x => x.RadiantTeamId)
            .OnDelete(DeleteBehavior.Restrict);
        
        builder
            .HasOne(x => x.Dire)
            .WithMany()
            .HasForeignKey(x => x.DireTeamId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .Property(x => x.GameResult)
            .HasComment("Результат игры")
            .HasConversion<string>();
    }
}