using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PropertiesController(ApplicationDbContext context)
        {
            _context = context;

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            return await _context.Properties.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyDto>> GetProperty(Guid id)
        {
            var property = await _context.Properties
        .Include(p => p.ApplicationUser)
        .FirstOrDefaultAsync(p => p.Id == id);

            if (property == null || property.ApplicationUser == null)
            {
                return NotFound();
            }

            var propertyDto = new PropertyDto
            {
                Id = property.Id,
                Address = property.Address,
                Postcode = property.Postcode,
                Rent = property.Rent,
                Bedroom = property.Bedroom,
                Bathroom = property.Bathroom,
                Type = property.Type,
                CarSpot = property.CarSpot,
                Availability = property.Availability,
                IsVacant = property.IsVacant,
                Heater = property.Heater,
                Cooler = property.Cooler,
                IsPetAllowed = property.IsPetAllowed,
                Wardrobes = property.Wardrobes,
                Summary = property.Summary,
                CreatedAt = property.CreatedAt,
                LandlordId = property.LandlordId,
                LandlordUsername = property.ApplicationUser?.UserName
            };

            return Ok(propertyDto); ;
        }

        [HttpGet("/landlord/{landlordId}")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertyByLandlord(string landlordId)
        {
            var properties = await _context.Properties.Where(p => p.LandlordId == landlordId)
                .ToListAsync();
            if (properties == null || properties.Count == 0)
            {
                return Ok(Array.Empty<Property>());
            }

            return properties;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProperty(Guid id, NewProperty property)
        {
            var landlord = await _context.Users.FirstOrDefaultAsync(u => u.Id == property.LandlordId);

            if (id != @property.Id || landlord is null)
            {
                return BadRequest();
            }
            var newproperty = new Property
            {
                Id = property.Id,
                Address = property.Address,
                Postcode = property.Postcode,
                Rent = property.Rent,
                Bedroom = property.Bedroom,
                CarSpot = property.CarSpot,
                Availability = property.Availability,
                IsVacant = property.IsVacant,
                Heater = property.Heater,
                Cooler = property.Cooler,
                IsPetAllowed = property.IsPetAllowed,
                Wardrobes = property.Wardrobes,
                Summary = property.Summary,
                Type = property.Type,
                LandlordId = landlord.Id,
                ApplicationUser = landlord,
                Bathroom = property.Bathroom,
                CreatedAt = property.CreatedAt

            };

            _context.Entry(newproperty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Property>> PostProperty(NewProperty property)
        {
            var landlord = await _context.Users.FirstOrDefaultAsync(u => u.Id == property.LandlordId);

            if (landlord != null)
            {
                var newproperty = new Property
                {
                    Id = property.Id,
                    Address = property.Address,
                    Postcode = property.Postcode,
                    Rent = property.Rent,
                    Bedroom = property.Bedroom,
                    CarSpot = property.CarSpot,
                    Availability = property.Availability,
                    IsVacant = property.IsVacant,
                    Heater = property.Heater,
                    Cooler = property.Cooler,
                    IsPetAllowed = property.IsPetAllowed,
                    Wardrobes = property.Wardrobes,
                    Summary = property.Summary,
                    LandlordId = landlord.Id,
                    ApplicationUser = landlord,
                    Bathroom = property.Bathroom,
                    CreatedAt = DateTime.Now,
                    Type = property.Type

                };
                _context.Properties.Add(newproperty);

                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProperty", new { id = property.Id }, property);
            }
            return NotFound();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            var @property = await _context.Properties.FindAsync(id);
            if (@property == null)
            {
                return NotFound();
            }

            _context.Properties.Remove(@property);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PropertyExists(Guid id)
        {
            return _context.Properties.Any(e => e.Id == id);
        }
    }
}
