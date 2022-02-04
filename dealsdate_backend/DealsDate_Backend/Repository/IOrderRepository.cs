using DealsDate_Backend.Models;
using System.Collections.Generic;

namespace DealsDate_Backend.Repository
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetOrdersByCustomerID(string customerId);
        IEnumerable<Order> GetOrdersBySellerID(string sellerId);
        void UpdateOrder(Order order);
        Order ViewOrder(long orderId);
        void AddOrder(Order order);
        void DeleteOrder(long orderId);
        void Save();
    }
}