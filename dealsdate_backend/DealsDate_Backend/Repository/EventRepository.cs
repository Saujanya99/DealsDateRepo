using DealsDate_Backend.DbContexts;
using DealsDate_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DealsDate_Backend.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly ProductContext _dbContext;

        public EventRepository(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void CreateEvent(Event events)
        {
            _dbContext.Add(events);
            Save();
        }

        public void DeleteEvent(long eventId)
        {
            var events = _dbContext.Events.Find(eventId);
            _dbContext.Events.Remove(events);
            Save();
        }

        public IEnumerable<Event> GetEvents(string customerId)
        {
            return _dbContext.Events.Where(c => c.CustomerID == customerId).ToList();

        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void UpdateEvent(Event events)
        {
            _dbContext.Entry(events).State = EntityState.Modified;
            Save();
        }
    }
}