using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configuration;

public class CharacterInTeamConfiguration: IEntityTypeConfiguration<CharacterInTeam>
{
    public void Configure(EntityTypeBuilder<CharacterInTeam> builder)
    {
        builder.ToTable("character_in_teams");
        
        builder.Property(h => h.Id).UseIdentityByDefaultColumn().HasComment("Идентификатор записи");

        builder.Property(x => x.CharacterId).HasComment("Связь с персонажем");
        builder.Property(x => x.TeamInGameId).HasComment("Связь персонажа с конкретным пиком");
        
        builder
            .Property(x => x.GameRole)
            .HasComment("Игровая роль")
            .HasConversion<string>();

        builder
            .HasOne(x => x.Hero)
            .WithMany()
            .HasForeignKey(x => x.CharacterId);
    }
}