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
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistRepository _wishlistRepository;
        public WishlistController(IWishlistRepository wishlistRepository)
        {
            _wishlistRepository = wishlistRepository;
        }

        //[HttpGet("{id}")]
        //public IActionResult GetAll(long customerId)
        //{
        //    var products = _wishlistRepository.GetWishlistProducts(customerId);
        //    return new OkObjectResult(products);
        //}
        [HttpGet("{customerId}", Name = "GetById")]
        [Authorize]
        public IActionResult GetById(string customerId)
        {
            try
            {
                var wishlistt = _wishlistRepository.GetWishlistProductById(customerId);
                return new OkObjectResult(wishlistt);
            }
            catch (GetWishlistProductByCustomerId)
            {
                throw new GetWishlistProductByCustomerId("Wishlist not retrived, try again");
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Wishlist wishlist)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _wishlistRepository.InsertWishlistProduct(wishlist);
                    scope.Complete();
                    return CreatedAtAction(nameof(GetById), new { customerId = wishlist.CustomerId }, wishlist);
                }
            }
            catch (ProductNotAddedToWishlistException)
            {
                throw new ProductNotAddedToWishlistException("Product not added to wishlist");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                _wishlistRepository.RemoveWishlistProduct(id);
                return new OkResult();
            }
            catch (ProductNotRemovedFromWishlistException)
            {
                throw new ProductNotRemovedFromWishlistException("Product not removed from wishlist");
            }
        }
    }
}
