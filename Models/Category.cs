﻿using System.ComponentModel.DataAnnotations;
namespace Commy.Models
{
    public class Category
    {
        [Key]
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public List<Product>? Products { get; set; }

        public Category(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }
}
