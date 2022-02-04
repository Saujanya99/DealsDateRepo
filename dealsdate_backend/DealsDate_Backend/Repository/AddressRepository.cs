using DealsDate_Backend.DbContexts;
using DealsDate_Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace DealsDate_Backend.Repository
{
    public class AddressRepository : IAddressRepository

    {

        private readonly ProductContext _dbContext;
        public AddressRepository(ProductContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void DeleteAddress(long AddressId)
        {
            var address = _dbContext.Addresses.Find(AddressId);
            _dbContext.Addresses.Remove(address);
            Save();
        }

        public IEnumerable<Address> GetAddress(string customerId)
        {
            return _dbContext.Addresses.Where(a => a.CustomerId == customerId).ToList();
        }

        public Address GetAddressByCustomerID(string CustomerId)
        {
            return _dbContext.Addresses.Find(CustomerId);
        }

        public Address GetAddressByID(long AddressId)
        {
            return _dbContext.Addresses.Find(AddressId);
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void UpdateAddress(Address address)
        {
            _dbContext.Entry(address).State = EntityState.Modified;
            Save();
        }

        public void InsertAddress(Address address)
        {
            _dbContext.Add(address);
            Save();
        }


    }
}