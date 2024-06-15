using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Server.Models;
using Server.Models.Entities;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IpropertyService _propertyService;

        public PropertiesController(IpropertyService propertyService)
        {
            _propertyService = propertyService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            var properties = await _propertyService.GetAllPropertiesAsync();
            return Ok(properties);
        }

        [HttpGet("filter")]
        [EnableQuery]
        public async Task<ActionResult<IEnumerable<NewProperty>>> GetPropertiesByFilter(ODataQueryOptions<Property> options, [FromQuery] PropertyFilter filter)
        {
            var properties = await _propertyService.GetPropertiesByFilterAsync(options, filter);
            return Ok(properties);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyDto>> GetProperty(Guid id)
        {
            try
            {
                var property = await _propertyService.GetPropertyAsync(id);
                return Ok(property);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }

        [HttpGet("landlord/{landlordId}")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertyByLandlord(string landlordId)
        {

            var properties = await _propertyService.GetPropertyByLandlordAsync(landlordId);
            if (properties == null || !properties.Any())
            {
                return Ok(Array.Empty<Property>());
            }
            return Ok(properties);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutProperty(Guid id, NewProperty property)
        {
            var success = await _propertyService.UpdatePropertyAsync(id, property);
            if (!success)
            {
                return BadRequest();
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Property>> PostProperty(NewProperty property)
        {
            try
            {
                var createdProperty = await _propertyService.CreatePropertyAsync(property);
                return CreatedAtAction("GetProperty", new { id = createdProperty.Id }, createdProperty);
            }
            catch (ArgumentException)
            {
                return BadRequest("Invalid info.");
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            var success = await _propertyService.DeletePropertyAsync(id);
            if (!success)
            {
                return BadRequest();
            }
            return NoContent();
        }


    }
}
