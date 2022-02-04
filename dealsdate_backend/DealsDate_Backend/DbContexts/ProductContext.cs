using DealsDate_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace DealsDate_Backend.DbContexts
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {
        }
        public DbSet<Wishlist> Wishlist { get; set; }
        public DbSet<Cart> Carts { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}
