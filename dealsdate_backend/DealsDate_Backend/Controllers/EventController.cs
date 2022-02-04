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
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet("{customerId}")]
        [Authorize]
        public IActionResult Get(string customerId)
        {
            try
            {
                var events = _eventRepository.GetEvents(customerId);
                return new OkObjectResult(events);
            }
            catch (GetEventByIdException)
            {
                throw new GetEventByIdException("Event not found !");
            }
        }

        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody] Event events)
        {
            if (events != null)
            {
                using (var scope = new TransactionScope())
                {
                    _eventRepository.UpdateEvent(events);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }



        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Event events)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _eventRepository.CreateEvent(events);
                    scope.Complete();
                    return CreatedAtAction(nameof(Get), new
                    {
                        customerId = events.CustomerID
                    }, events);
                }
            }
            catch (EventNotCreatedSuccessfullyException)
            { throw new EventNotCreatedSuccessfullyException("Event creation failed"); }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(long id)
        {
            try
            {
                _eventRepository.DeleteEvent(id);
                return new OkResult();
            }
            catch (EventNotRemovedSuccessfullyException)
            {
                throw new EventNotRemovedSuccessfullyException("Event was not deleted");
            }
        }
    }
}