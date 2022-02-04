using DealsDate_Backend.Models;
using System.Collections.Generic;

namespace DealsDate_Backend.Repository
{
    public interface ICartRepository
    {
        /// <summary>
        /// Developed By : Ankit Singh
        /// Returns a list of all the products added to cart
        /// </summary>
        IEnumerable<Cart> GetCartProducts(string customerId);


        /// <summary>
        /// Developed By : Ankit Singh
        /// Function Description : Adding products to wishlist
        /// </summary>
        void AddProductsToCart(Cart product);

        /// <summary>
        /// Developed By : Ankit Singh
        /// Function Description : Removing products from wishlist
        /// </summary>
        void RemoveProductFromCart(long productId);


        void Save();
    }
}
