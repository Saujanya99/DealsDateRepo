using DealsDate_Backend.DbContexts;
using DealsDate_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DealsDate_Backend.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ProductContext _dbContext;

        public OrderRepository(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DeleteOrder(long orderId)
        {
            var Order = _dbContext.Orders.Find(orderId);
            _dbContext.Orders.Remove(Order);
            Save();
        }

        public Order ViewOrder(long orderId)
        {
            return _dbContext.Orders.Find(orderId);
        }

        public IEnumerable<Order> GetOrdersByCustomerID(string customerId)
        {
            return _dbContext.Orders.Where(o => o.customerId == customerId).ToList();

        }

        public IEnumerable<Order> GetOrdersBySellerID(string sellerId)
        {
            return _dbContext.Orders.Where(o => o.sellerId == sellerId).ToList();

        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void AddOrder(Order order)
        {
            _dbContext.Add(order);
            Save();
        }

        public void UpdateOrder(Order order)
        {
            _dbContext.Entry(order).State = EntityState.Modified;
            Save();
        }
    }
}
