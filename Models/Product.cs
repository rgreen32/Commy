using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commy.Models
{
    public class Product
    {
        [Key]
        public int? Id { get; set; }
        public string? Name { get; set; }
        public float? Price { get; set; }


        [ForeignKey("CategoryId")]
        public int CategoryId {get; set;}

        public Product(string name, float? price)
        {
            Name = name;
            Price = price;
        }
    }
}
