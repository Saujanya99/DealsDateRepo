using DealsDate_Backend.DbContexts;
using DealsDate_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DealsDate_Backend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ProductContext _dbContext;

        public ProductRepository(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void DeleteProduct(long productId)
        {
            var product = _dbContext.Products.Find(productId);
            if (product != null)
            {
                try
                {
                    _dbContext.Products.Remove(product);
                    Save();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

        }

        public IEnumerable<Product> GetProductsBySellerId(string sellerId)
        {
            return _dbContext.Products.Where(p => p.sellerId == sellerId).ToList();
        }

        public Product GetProductByID(long productId)
        {
            return _dbContext.Products.Find(productId);
        }

        public IEnumerable<Product> GetProducts()
        {
            return _dbContext.Products.ToList();
        }

        public void InsertProduct(Product product)
        {
            _dbContext.Add(product);
            Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void UpdateProduct(Product product)
        {
            _dbContext.Entry(product).State = EntityState.Modified;
            Save();
        }
    }
}
