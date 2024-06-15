
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;

public interface IpropertyService
{
    Task<IEnumerable<Property>> GetAllPropertiesAsync();
    Task<IEnumerable<NewProperty>> GetPropertiesByFilterAsync(ODataQueryOptions<Property> options, PropertyFilter filter);
    Task<PropertyDto> GetPropertyAsync(Guid id);
    Task<IEnumerable<Property>> GetPropertyByLandlordAsync(string landlordId);
    Task<bool> UpdatePropertyAsync(Guid id, NewProperty property);
    Task<Property> CreatePropertyAsync(NewProperty property);
    Task<bool> DeletePropertyAsync(Guid id);
}

public class PropertyService : IpropertyService
{
    private readonly ApplicationDbContext _context;

    public PropertyService(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Property>> GetAllPropertiesAsync()
    {
        return await _context.Properties
                              .OrderByDescending(p => p.CreatedAt)
                              .ToListAsync();
    }

    public async Task<IEnumerable<NewProperty>> GetPropertiesByFilterAsync(ODataQueryOptions<Property> options, PropertyFilter filter)
    {
        var query = _context.Properties.AsQueryable();

        if (!string.IsNullOrEmpty(filter.Postcode))
        {
            query = query.Where(p => p.Postcode.Contains(filter.Postcode));
        }

        if (filter.IsPetAllowed.HasValue)
        {
            query = query.Where(p => p.IsPetAllowed == filter.IsPetAllowed.Value);
        }

        if (filter.MinRent.HasValue)
        {
            query = query.Where(p => p.Rent >= filter.MinRent.Value);
        }

        if (filter.MaxRent.HasValue)
        {
            query = query.Where(p => p.Rent <= filter.MaxRent.Value);
        }
        if (filter.MinBedroom.HasValue)
        {
            query = query.Where(p => p.Bedroom >= filter.MinBedroom.Value);
        }
        if (filter.MaxBedroom.HasValue)
        {
            query = query.Where(p => p.Bedroom <= filter.MaxBedroom.Value);
        }
        if (filter.Carspot.HasValue)
        {
            query = query.Where(p => p.CarSpot >= filter.Carspot.Value);
        }
        query = query.Where(p => p.IsVacant == true);

        var filteredQuery = options.ApplyTo(query) as IQueryable<Property>;
        if (filteredQuery is not null)
        {
            var resultQuery = await filteredQuery.Select(p => new NewProperty
            {
                Id = p.Id,
                Address = p.Address,
                Postcode = p.Postcode,
                Rent = p.Rent,
                Bedroom = p.Bedroom,
                CarSpot = p.CarSpot,
                Availability = p.Availability,
                IsVacant = p.IsVacant,
                Heater = p.Heater,
                Cooler = p.Cooler,
                IsPetAllowed = p.IsPetAllowed,
                Wardrobes = p.Wardrobes,
                Summary = p.Summary,
                Bathroom = p.Bathroom,
                CreatedAt = p.CreatedAt,
                LandlordId = p.LandlordId,
                Type = p.Type
            }).ToListAsync();

            return resultQuery;
        }
        return Enumerable.Empty<NewProperty>().AsQueryable();
    }

    public async Task<PropertyDto> GetPropertyAsync(Guid id)
    {
        var property = await _context.Properties
       .Include(p => p.ApplicationUser)
       .FirstOrDefaultAsync(p => p.Id == id);

        if (property == null || property.ApplicationUser == null)
        {
            throw new ArgumentException("Invalid information");
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

        return propertyDto;
    }

    public async Task<IEnumerable<Property>> GetPropertyByLandlordAsync(string landlordId)
    {
        var properties = await _context.Properties.Where(p => p.LandlordId == landlordId)
               .ToListAsync();
        if (properties == null || properties.Count == 0)
        {
            return Enumerable.Empty<Property>();
        }

        return properties;
    }

    public async Task<bool> UpdatePropertyAsync(Guid id, NewProperty property)
    {
        var landlord = await _context.Users.FirstOrDefaultAsync(u => u.Id == property.LandlordId);

        if (id != @property.Id || landlord is null)
        {
            return false;
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
            return true;
        }
        catch (DbUpdateConcurrencyException)
        {
            return false;
        }
    }

    public async Task<Property> CreatePropertyAsync(NewProperty property)
    {
        var landlord = await _context.Users.FirstOrDefaultAsync(u => u.Id == property.LandlordId);

        if (landlord == null)
        {
            throw new ArgumentException("Invalid Landlord ID");
        }

        var newProperty = new Property
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

        _context.Properties.Add(newProperty);
        await _context.SaveChangesAsync();

        return newProperty;
    }

    public async Task<bool> DeletePropertyAsync(Guid id)
    {
        var property = await _context.Properties.FindAsync(id);
        if (property == null)
        {
            return false;
        }

        _context.Properties.Remove(property);
        await _context.SaveChangesAsync();

        return true;
    }


}


