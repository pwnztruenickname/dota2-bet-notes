using Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configuration;

public class HeroConfiguration : IEntityTypeConfiguration<Hero>
{
    public void Configure(EntityTypeBuilder<Hero> builder)
    {
        builder.ToTable("heroes");

        builder.Property(h => h.Id).UseIdentityByDefaultColumn();
        builder.Property(h => h.Id).HasComment("Идентификатор записи");
        
        builder.Property(x => x.LocalizedName).HasComment("Наименование");
    }
}