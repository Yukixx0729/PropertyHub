using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Entities;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MySavedsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MySavedsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("renter/{id}")]
        public async Task<ActionResult<IEnumerable<MySaved>>> GetMySaved(string id)
        {
            var mySaveds = await _context.MySaveds.Where(m => m.RenterId == id).Include(m => m.Property).ToListAsync();
            if (mySaveds == null || mySaveds.Count == 0)
            {
                return Ok(Array.Empty<MySaved>());
            }
            return mySaveds;
        }

        [HttpPost]
        public async Task<ActionResult<MySaved>> PostMySaved(NewSaved mySaved)
        {
            var renter = await _context.Users.FirstOrDefaultAsync(u => u.Id == mySaved.RenterId);
            var property = await _context.Properties.FirstOrDefaultAsync(p => p.Id == mySaved.PropertyId);
            if (renter != null && property != null)
            {
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
                return CreatedAtAction("GetMySaved", new { id = mySaved.Id }, mySaved);
            };
            return NotFound();

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMySaved(Guid id)
        {
            var mySaved = await _context.MySaveds.FindAsync(id);
            if (mySaved == null)
            {
                return NotFound();
            }

            _context.MySaveds.Remove(mySaved);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MySavedExists(Guid id)
        {
            return _context.MySaveds.Any(e => e.Id == id);
        }
    }
}
