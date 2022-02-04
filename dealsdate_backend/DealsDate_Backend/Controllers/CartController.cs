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
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet("{customerId}")]
        [Authorize]
        public IActionResult GetCartItem(string customerId)
        {
            try
            {
                var cartProducts = _cartRepository.GetCartProducts(customerId);
                return new OkObjectResult(cartProducts);
            }
            catch (GetAllCartItemsByCustomerId)
            {
                throw new GetAllCartItemsByCustomerId("Cart Items not loaded.");
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Cart cartProduct)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _cartRepository.AddProductsToCart(cartProduct);
                    scope.Complete();
                    return CreatedAtAction(nameof(GetCartItem), new { customerId = cartProduct.customerId }, cartProduct);
                }
            }
            catch (ProductNotAddedToCartException)
            {
                throw new ProductNotAddedToCartException("Product not added to cart, try again");
            }
        }
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                _cartRepository.RemoveProductFromCart(id);
                return new OkResult();
            }
            catch (ProductNotRemovedFromCartException)
            {
                throw new ProductNotRemovedFromCartException("Product not removed from cart, try again");
            }
        }
    }
}
