using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.OData.Edm;
using Server.Controllers;
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

        [Fact]
        private async Task InsertDataAsync()
        {
            var properties = new List<Property>
        {
            new() { Id = Guid.Parse("9f1c6bc3-3e90-4f58-9f68-8fb91a4f34b1"), Address = "123 Main St" ,Postcode="3001",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="1",ApplicationUser = new ApplicationUser { } },
            new() { Id = Guid.NewGuid(), Address = "456 Elm St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="2",ApplicationUser = new ApplicationUser {  } },
            new() { Id = Guid.NewGuid(), Address = "567 High St" ,Postcode="3000",Type="Apartment",Rent=300,Bedroom=2,Bathroom=1,CarSpot=1,IsPetAllowed=true,IsVacant=true, Heater=true,Cooler=true,Wardrobes=true,Summary="test",LandlordId="2",ApplicationUser = new ApplicationUser { } },
        };

            var users = new List<ApplicationUser>
            {
                new(){ Id = "1"},

            };
            await _context.Properties.AddRangeAsync(properties);
            await _context.Users.AddRangeAsync(users);
            await _context.SaveChangesAsync();

        }

        //tests

        [Fact]
        public async Task GetAllPropertiesAsync_ReturnsProperties()
        {
            await InsertDataAsync();


            var result = await _service.GetAllPropertiesAsync();

            Assert.Equal(3, result.Count());
            Assert.Contains(result, p => p.Address == "123 Main St");
            Assert.Contains(result, p => p.Address == "456 Elm St");
            Assert.Contains(result, p => p.Address == "567 High St");
        }

        [Fact]
        public async Task GetPropertyByLandlordAsync_ReturnPropertiesByLandlordId()
        {
            await InsertDataAsync();


            var result = await _service.GetPropertyByLandlordAsync("1");

            Assert.Single(result);
            Assert.Contains(result, p => p.Address == "123 Main St");
        }

        [Fact]
        public async Task GetPropertyAsync_ReturnPropertyById()
        {
            await InsertDataAsync();

            var result = await _service.GetPropertyAsync(Guid.Parse("9f1c6bc3-3e90-4f58-9f68-8fb91a4f34b1"));
            Assert.Equal("123 Main St", result.Address);
        }

        [Fact]
        public async Task CreatePropertyAsync_ReturnNewProperty()
        {
            await InsertDataAsync();
            var newProperty = new NewProperty
            {
                Id = Guid.NewGuid(),
                Address = "789 Rainbow Rd",
                Postcode = "3088",
                Rent = 440,
                Bedroom = 3,
                CarSpot = 1,
                Availability = DateTime.Now,
                IsVacant = true,
                Heater = true,
                Cooler = true,
                IsPetAllowed = true,
                Wardrobes = true,
                Summary = "test only",
                LandlordId = "1",
                Bathroom = 2,
                CreatedAt = DateTime.Now,
                Type = "Apartment"
            };
            var result = await _service.CreatePropertyAsync(newProperty);
            Assert.Equal("789 Rainbow Rd", result.Address);

            var properties = await _service.GetAllPropertiesAsync();
            Assert.Equal(4, properties.Count());

        }

        [Fact]
        public async Task DeletePropertyAsync_ReturnTrue()
        {
            await InsertDataAsync();

            var result = await _service.DeletePropertyAsync(Guid.Parse("9f1c6bc3-3e90-4f58-9f68-8fb91a4f34b1"));

            Assert.True(result);

            var properties = await _service.GetAllPropertiesAsync();

            Assert.Equal(2, properties.Count());
        }

        [Fact]
        public async Task UpdatePropertyAsync_ReturnTrue()
        {
            await InsertDataAsync();
            var newproperty = new NewProperty
            {
                Id = Guid.Parse("9f1c6bc3-3e90-4f58-9f68-8fb91a4f34b1"),
                Address = "123 Main St",
                Postcode = "3000",
                Type = "Apartment",
                Rent = 400,
                Bedroom = 2,
                Bathroom = 1,
                CarSpot = 1,
                IsPetAllowed = true,
                IsVacant = true,
                Heater = true,
                Cooler = true,
                Wardrobes = true,
                Summary = "test",
                LandlordId = "1",
                CreatedAt = DateTime.Now,
                Availability = DateTime.Now,
            };

            var result = await _service.UpdatePropertyAsync(Guid.Parse("9f1c6bc3-3e90-4f58-9f68-8fb91a4f34b1"), newproperty);
            Assert.True(result);
            var property = await _service.GetPropertyAsync(Guid.Parse("9f1c6bc3-3e90-4f58-9f68-8fb91a4f34b1"));
            Assert.Equal(400, property.Rent);
        }





    }
}