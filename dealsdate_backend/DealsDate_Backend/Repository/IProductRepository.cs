
using DealsDate_Backend.Models;
using System.Collections.Generic;

namespace DealsDate_Backend.Repository
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts();

        IEnumerable<Product> GetProductsBySellerId(string sellerId);
        Product GetProductByID(long productId);
        void InsertProduct(Product product);
        void DeleteProduct(long productId);
        void UpdateProduct(Product product);
        void Save();
    }
}
