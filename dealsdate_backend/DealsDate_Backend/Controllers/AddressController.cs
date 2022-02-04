using DealsDate_Backend.Models;
using DealsDate_Backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;
using static DealsDate_Backend.Exceptions.ExceptionClass;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DealsDate_Backend.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    [ApiController]
    public class AddressController : ControllerBase
    {

        private readonly IAddressRepository _addressRepository;
        public AddressController(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }
        // GET: api/<AddressController>
        [HttpGet("ByCustomer/{customerId}")]
        [Authorize]
        public IActionResult GetAll(string customerId)
        {
            try
            {
                var addresses = _addressRepository.GetAddress(customerId);
                return new OkObjectResult(addresses);
            }
            catch (GetAllAddressException)
            {
                throw new GetAllAddressException("Something went wrong. Try again");
            }
        }

        // GET api/<AddressController>/5
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(long id)
        {
            var addresses = _addressRepository.GetAddressByID(id);
            return new OkObjectResult(addresses);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Address address)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _addressRepository.InsertAddress(address);
                    scope.Complete();
                    return CreatedAtAction(nameof(Get), new { id = address.AddressId }, address);
                }
            }
            catch (AddressNotAddedSuccessfullyException)
            {
                throw new AddressNotAddedSuccessfullyException("Address was not added. Try again");
            }
        }

        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody] Address addresses)
        {
            if (addresses != null)
            {
                using (var scope = new TransactionScope())
                {
                    _addressRepository.UpdateAddress(addresses);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }
        // DELETE api/<AddressController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            try
            {
                _addressRepository.DeleteAddress(id);
                return new OkResult();
            }
            catch (AddressNotRemovedSuccessfullyException)
            {
                throw new AddressNotRemovedSuccessfullyException("Address was not deleted");
            }
        }
    }
}