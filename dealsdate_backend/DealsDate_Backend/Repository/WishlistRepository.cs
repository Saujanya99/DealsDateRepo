using DealsDate_Backend.DbContexts;
using DealsDate_Backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace DealsDate_Backend.Repository
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly ProductContext _dbContext;

        public WishlistRepository(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        //public IEnumerable<Wishlist> GetWishlistProducts(long customerId)
        //{
        //    return _dbContext.Wishlist.Where(wishlist => wishlist.CustomerId == customerId).ToList(); 
        //}

        public void InsertWishlistProduct(Wishlist wishlistProduct)
        {
            _dbContext.Add(wishlistProduct);
            Save();
        }

        public void RemoveWishlistProduct(long wishlistId)
        {
            var wishlistProduct = _dbContext.Wishlist.Find(wishlistId);
            _dbContext.Wishlist.Remove(wishlistProduct);
            Save();
        }

        IEnumerable<Wishlist> IWishlistRepository.GetWishlistProductById(string customerId)
        {
            return _dbContext.Wishlist.Where(wishlist => wishlist.CustomerId == customerId).ToList();
        }
    }
}
