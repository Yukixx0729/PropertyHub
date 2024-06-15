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
        private readonly ImysavedService _mysavedService;

        public MySavedsController(ImysavedService mysavedService)
        {
            _mysavedService = mysavedService;
        }

        [HttpGet("renter/{id}")]
        public async Task<ActionResult<IEnumerable<MySaved>>> GetMySaved(string id)
        {
            try
            {
                var mysaveds = await _mysavedService.GetAllMysavedsAsync(id);
                return Ok(mysaveds);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<MySaved>> PostMySaved(NewSaved mySaved)
        {
            try
            {
                var newSaved = await _mysavedService.CreateMysavedAsync(mySaved);
                return Ok(newSaved);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMySaved(Guid id)
        {
            var success = await _mysavedService.DeleteMysavedAsync(id);
            if (!success)
            {
                return BadRequest();
            }
            return NoContent();
        }

    }
}
