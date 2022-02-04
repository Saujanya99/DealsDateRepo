using DealsDate_Backend.Models;
using System.Collections.Generic;

namespace DealsDate_Backend.Repository
{
    public interface IWishlistRepository
    {
        /// <summary>
        /// Developed By : Ankit Singh
        /// Returns a list of all the wishlist products
        /// </summary>
     //   IEnumerable<Wishlist> GetWishlistProducts(long customerId);

        /// <summary>
        /// Developed By : Ankit Singh
        /// Returns a wishlist product by Id, used in search function
        /// </summary>
        IEnumerable<Wishlist> GetWishlistProductById(string customerId);

        /// <summary>
        /// Developed By : Ankit Singh
        /// Function Description : Adding products to wishlist
        /// </summary>
        void InsertWishlistProduct(Wishlist wishlistProduct);

        /// <summary>
        /// Developed By : Ankit Singh
        /// Function Description : Removing products from wishlist
        /// </summary>
        void RemoveWishlistProduct(long wishlistId);

        //In Doubt

        /// <summary>
        /// Developed By : Ankit Singh
        /// Function Description : Saving the changes
        /// </summary>
        void Save();

    }
}
