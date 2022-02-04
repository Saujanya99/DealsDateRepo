using DealsDate_Backend.Models;
using DealsDate_Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;
using static DealsDate_Backend.Exceptions.ExceptionClass;

namespace DealsDate_Backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet("ByCustomer/{customerId}")]
        [Authorize]
        public IActionResult GetOrderByCustomerId(string customerId)
        {
            try
            {
                var orders = _orderRepository.GetOrdersByCustomerID(customerId);
                return new OkObjectResult(orders);
            }
            catch (GetEventByIdException)
            {
                throw new GetEventByIdException("Event not found !");
            }
        }

        [HttpGet("BySeller/{sellerId}")]
        [Authorize]
        public IActionResult GetOrderBySellerId(string sellerId)
        {
            try
            {
                var orders = _orderRepository.GetOrdersBySellerID(sellerId);
                return new OkObjectResult(orders);
            }
            catch (GetEventByIdException)
            {
                throw new GetEventByIdException("Event not found !");
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult AddOrder([FromBody] Order order)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _orderRepository.AddOrder(order);
                    scope.Complete();
                    return CreatedAtAction(nameof(ViewOrder), new { orderId = order.OrderId }, order);
                }
            }
            catch (OrderNotAddedSuccessfullyException)
            {
                throw new OrderNotAddedSuccessfullyException("Order coudn't be placed. Try again");
            }
        }
        [HttpGet]
        [Route("ViewOrder/{orderId}")]
        [Authorize]
        public IActionResult ViewOrder(long orderId)
        {
            Order order = _orderRepository.ViewOrder(orderId);
            if (order != null)
            {
                return Ok(order);
            }
            else
            {
                return BadRequest("OrderID not valid");
            }
        }

        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody] Order order)
        {
            if (order != null)
            {
                using (var scope = new TransactionScope())
                {
                    _orderRepository.UpdateOrder(order);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                _orderRepository.DeleteOrder(id);
                return new OkResult();
            }
            catch (OrderNotRemovedSuccessfullyException)
            {
                throw new OrderNotRemovedSuccessfullyException("Order not deleted. Try again");
            }
        }
    }
}