using System.ComponentModel.DataAnnotations;

namespace DealsDate_Backend.Models
{
    public class Product
    {
        [Key]
        public long productId { get; set; }
        [Required]
        public string productName { get; set; }
        public string productDescription { get; set; }
        [Required]
        public double productPrice { get; set; }
        public double productMRP { get; set; }
        [Required]
        public string productCategory { get; set; }
        [Required]
        public string productImageLink { get; set; }
        [Required]
        public string sellerId { get; set; }
    }
}