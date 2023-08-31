using System.Collections;
using Commy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
namespace Commy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController: ControllerBase
    {
        private CommyDBContext _context {get; set;}
        public ProductsController(CommyDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = _context.Products.ToList();
            return products;
        }

        [HttpPost]
        public async Task<ActionResult> CreateProduct([FromBody] Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok(product);
        }
    }
}