using System.ComponentModel.DataAnnotations;

namespace DealsDate_Backend.Models
{
    public class Wishlist
    {
        [Key]
        public long WishListProductId { get; set; }
        [Required]
        public long ProductId { get; set; } //if there are multiple products in wishlist
        [Required]
        public string CustomerId { get; set; }
    }
}