using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;
public interface ImysavedService
{
    Task<IEnumerable<MySaved>> GetAllMysavedsAsync(string id);

    Task<MySaved> CreateMysavedAsync(NewSaved mySaved);

    Task<bool> DeleteMysavedAsync(Guid id);
}

public class MySavedService : ImysavedService
{
    private readonly ApplicationDbContext _context;

    public MySavedService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MySaved>> GetAllMysavedsAsync(string id)
    {
        var mySaveds = await _context.MySaveds.Where(m => m.RenterId == id).Include(m => m.Property).ToListAsync();
        if (mySaveds == null || !mySaveds.Any())
        {
            return [];
        }
        return mySaveds;
    }

    public async Task<MySaved> CreateMysavedAsync(NewSaved mySaved)
    {
        var renter = await _context.Users.FirstOrDefaultAsync(u => u.Id == mySaved.RenterId);
        var property = await _context.Properties.FirstOrDefaultAsync(p => p.Id == mySaved.PropertyId);
        if (renter == null || property == null)
        {
            throw new ArgumentException("Invalid RenterId or PropertyId provided");
        }

        var newSaved = new MySaved
        {
            Id = mySaved.Id,
            RenterId = mySaved.RenterId,
            PropertyId = mySaved.PropertyId,
            ApplicationUser = renter,
            Property = property
        };

        _context.MySaveds.Add(newSaved);
        await _context.SaveChangesAsync();

        return newSaved;
    }

    public async Task<bool> DeleteMysavedAsync(Guid id)
    {
        var mySaved = await _context.MySaveds.FindAsync(id);
        if (mySaved == null)
        {
            return false;
        }

        _context.MySaveds.Remove(mySaved);
        await _context.SaveChangesAsync();

        return true;
    }
}