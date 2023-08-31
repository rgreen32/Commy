using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Commy;
using Commy.Models;

namespace Commy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : Controller
    {
        private readonly CommyDBContext _context;

        public CategoriesController(CommyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = _context.Categories.Include(c => c.Products).ToList();
            return categories;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory(string name, string description)
        {
            Category category = new Category(name, description);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCategory([FromBody] Category categoryUpdate)
        {
            _context.Categories.Update(categoryUpdate);
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);
            _context.Categories.Remove(category);
            _context.SaveChanges();

            return Ok();
        }
    }
}
