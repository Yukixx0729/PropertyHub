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
        public async Task<ActionResult<Property>> GetProperty(Guid id)
        {
            var @property = await _context.Properties.FindAsync(id);

            if (@property == null)
            {
                return NotFound();
            }

            return @property;
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
                CreatedAt = property.CreatedAt,
                LandlordId = landlord.Id,
                ApplicationUser = landlord

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
                    CreatedAt = property.CreatedAt,
                    LandlordId = landlord.Id,
                    ApplicationUser = landlord

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
