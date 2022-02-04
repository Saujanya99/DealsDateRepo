using System.ComponentModel.DataAnnotations;

namespace DealsDate_Backend.Models
{
    public class Cart
    {
        [Key]
        public long productCartId { get; set; }
        [Required]
        public string customerId { get; set; }
        [Required]
        public long productId { get; set; }
        [Required]
        public int productQuantity { get; set; }
        [Required]
        public long productTotal { get; set; } //to calculate final price of a single product based on quantity & id

    }
}