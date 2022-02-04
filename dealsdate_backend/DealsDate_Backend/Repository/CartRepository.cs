using DealsDate_Backend.DbContexts;
using DealsDate_Backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace DealsDate_Backend.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly ProductContext _dbContext;

        public CartRepository(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddProductsToCart(Cart product)
        {
            _dbContext.Add(product);
            Save();

        }

        public IEnumerable<Cart> GetCartProducts(string customerId)
        {
            return _dbContext.Carts.Where(cart => cart.customerId == customerId).ToList(); ;
        }

        public void RemoveProductFromCart(long productId)
        {
            var cartProduct = _dbContext.Carts.Find(productId);
            _dbContext.Carts.Remove(cartProduct);
            Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
