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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var products = _productRepository.GetProducts();
                return new OkObjectResult(products);
            }
            catch (GetAllProductException)
            {
                throw new GetAllProductException("Coudn't retrive all products. Try Again");
            }
        }

        [HttpGet("BySeller/{sellerId}")]
        [Authorize]
        public IActionResult GetProductsBySellerId(string sellerId)
        {
            try
            {
                var products = _productRepository.GetProductsBySellerId(sellerId);
                return new OkObjectResult(products);
            }
            catch (GetEventByIdException)
            {
                throw new GetEventByIdException("Event not found !");
            }
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(long id)
        {
            try
            {
                var product = _productRepository.GetProductByID(id);
                return new OkObjectResult(product);
            }
            catch (GetProductByIdException)
            {
                throw new GetProductByIdException("Coudn't find what you looking for. Try Again");
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Product product)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _productRepository.InsertProduct(product);
                    scope.Complete();
                    return CreatedAtAction(nameof(Get), new { id = product.productId }, product);
                }
            }
            catch (ProductNotAddedException)
            {
                throw new ProductNotAddedException("Product Not Added successfully. Try Again");
            }
        }
        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody] Product product)
        {
            if (product != null)
            {
                using (var scope = new TransactionScope())
                {
                    _productRepository.UpdateProduct(product);
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
                _productRepository.DeleteProduct(id);
                return new OkResult();
            }
            catch (ProductNotRemoved)
            {
                throw new ProductNotRemoved("Product not removed Successfully. Try Again");
            }
        }
    }
}
