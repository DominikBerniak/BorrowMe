using Domain.Entieties;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistance
{
    public class CityConfiguration : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            //builder.HasData(
            //    new City
            //    {
            //        Name = "Inwałd",
            //        VoivodeshipId = Guid.Parse("4CC77232-2C26-4F70-4263-08D9F07EF5F6")
            //    }
            //);
        }
    }
}
