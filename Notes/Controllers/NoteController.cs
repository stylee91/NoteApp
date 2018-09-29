using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notes.Models;

namespace Notes.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly NoteContext _context;

        public NoteController(NoteContext context)
        {
            _context = context;
            
            /* if(_context.NoteItems.Count() == 0)
            {
                _context.NoteItems.Add(new NoteItem { Title = "Test" });
                _context.SaveChanges();
            } */
        }

        /// <summary>
        /// Gets all NoteItems.
        /// </summary>
        [HttpGet]
        public ActionResult<List<NoteItem>> GetAll()
        {
            return _context.NoteItems.ToList();
        }

        /// <summary>
        /// Gets a specific NoteItem.
        /// </summary>
        [HttpGet("{id}", Name = "GetNote")]
        public ActionResult<NoteItem> GetById(long id)
        {
            var item = _context.NoteItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        /// <summary>
        /// Creates a NoteItem.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Note
        ///     {
        ///        "id": 1,
        ///        "title": "Shoppinglist",
        ///        "description": "Milk, bread"
        ///     }
        ///
        /// </remarks>
        [HttpPost]
        public IActionResult Create(NoteItem item)
        {
            _context.NoteItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetNote", new { id = item.Id }, item);
        }

        /// <summary>
        /// Updates a specific NoteItem.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     PUT /Note
        ///     {
        ///        "id": 1,
        ///        "title": "Shoppinglist v2",
        ///        "description": "Milk, bread, sugar"
        ///     }
        ///
        /// </remarks>
        [HttpPut("{id}")]
        public IActionResult Update(long id, NoteItem item)
        {
            var note = _context.NoteItems.Find(id);
            if (note == null)
            {
                return NotFound();
            }

            note.Title = item.Title;
            note.Description = item.Description;

            _context.NoteItems.Update(note);
            _context.SaveChanges();
            return NoContent();
        }

        /// <summary>
        /// Deletes a specific NoteItem.
        /// </summary>
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var note = _context.NoteItems.Find(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.NoteItems.Remove(note);
            _context.SaveChanges();
            return NoContent();
        }

    }
}