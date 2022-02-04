using DealsDate_Backend.Models;
using System.Collections.Generic;

namespace DealsDate_Backend.Repository
{
    public interface IEventRepository
    {
        IEnumerable<Event> GetEvents(string customerId);
        void CreateEvent(Event events);
        void DeleteEvent(long eventId);
        void UpdateEvent(Event events);
        void Save();

    }
}