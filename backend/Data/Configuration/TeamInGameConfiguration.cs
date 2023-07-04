using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configuration;

public class TeamInGameConfiguration: IEntityTypeConfiguration<TeamInGame>
{
    public void Configure(EntityTypeBuilder<TeamInGame> builder)
    {
        builder.ToTable("team_in_games");

        builder.Property(h => h.Id).UseIdentityByDefaultColumn();
        builder.Property(h => h.Id).HasComment("Идентификатор записи");
        
        builder.Property(x => x.GameId).HasComment("Идентификатор игры");
        builder.Property(x => x.TeamId).HasComment("Идентификатор команды");

        builder.HasOne(x => x.Team).WithMany().HasForeignKey(x => x.TeamId).OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.CharactersInTeam).WithOne().HasForeignKey(x => x.TeamInGameId);

    }
}