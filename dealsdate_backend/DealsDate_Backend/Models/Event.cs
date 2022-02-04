using System;
using System.ComponentModel.DataAnnotations;

namespace DealsDate_Backend.Models
{
    public class Event
    {
        [Key]
        public long EventId { get; set; }
        public string EventCategory { get; set; }
        [Required]
        public DateTime EventDate { get; set; }
        [Required]
        public string EventName { get; set; }
        [Required]
        public string CustomerID { get; set; }

    }
}