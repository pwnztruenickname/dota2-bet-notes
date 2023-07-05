using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configuration;

public class TeamConfiguration: IEntityTypeConfiguration<Team>
{
    public void Configure(EntityTypeBuilder<Team> builder)
    {
        builder.ToTable("teams");
        
        builder.Property(h => h.Id).ValueGeneratedOnAdd().UseIdentityColumn().IsRequired();
        
        builder.Property(x => x.Name).HasComment("Наименование команды");
    }
}