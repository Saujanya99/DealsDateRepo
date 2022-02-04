using System.ComponentModel.DataAnnotations;

namespace DealsDate_Backend.Models
{

    public class Order
    {
        [Key]
        public long OrderId { get; set; }
        [Required]
        public long productId { get; set; }
        [Required]
        public string customerId { get; set; }
        [Required]
        public string customerAddress { get; set; }
        [Required]
        public string productName { get; set; }
        [Required]
        public double productPrice { get; set; }
        [Required]
        public int productQuantity { get; set; }
        [Required]
        public double totalCost { get; set; }
        public string deliveryStatus { get; set; }
        [Required]
        public string sellerId { get; set; }


    }
}