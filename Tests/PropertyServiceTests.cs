using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;

namespace Tests
{
    public class PropertyServiceTests
    {
        private readonly ApplicationDbContext _context;
        private readonly PropertyService _service;


        public PropertyServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Use a unique name for each test
                .Options;

            // Create a mock ApplicationDbContext
            _context = new ApplicationDbContext(options);

            // Create an instance of PropertyService with the mock context
            _service = new PropertyService(_context);
        }



        //tests

        [Fact]
        public async Task GetAllPropertiesAsync_ReturnsProperties()
        {
            var properties = new List<Property>
        {
            new() { Id = Guid.NewGuid(), Address = "123 Main St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="1",ApplicationUser = new ApplicationUser { Id = "1" } },
            new() { Id = Guid.NewGuid(), Address = "456 Elm St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="1",ApplicationUser = new ApplicationUser { Id = "2" } },
        };

            await _context.Properties.AddRangeAsync(properties);
            await _context.SaveChangesAsync();

            var result = await _service.GetAllPropertiesAsync();

            Assert.Equal(2, result.Count());
            Assert.Contains(result, p => p.Address == "123 Main St");
            Assert.Contains(result, p => p.Address == "456 Elm St");
        }

        [Fact]
        public async Task GetPropertyByLandlordAsync_ReturnProperties()
        {
            var properties = new List<Property>
        {
            new() { Id = Guid.NewGuid(), Address = "123 Main St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="1",ApplicationUser = new ApplicationUser { Id = "1" } },
            new() { Id = Guid.NewGuid(), Address = "456 Elm St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="1",ApplicationUser = new ApplicationUser { Id = "2" } },
             new() { Id = Guid.NewGuid(), Address = "444 Elm St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="1",ApplicationUser = new ApplicationUser { Id = "2" } },
        };
            await _context.Properties.AddRangeAsync(properties);
            await _context.SaveChangesAsync();

            var result = await _service.GetPropertyByLandlordAsync("2");
            Assert.Equal(2, result.Count());
            Assert.Contains(result, p => p.Address == "444 Elm St");
            Assert.Contains(result, p => p.Address == "456 Elm St");
        }


    }
}