using DealsDate_Backend.Models;
using System.Collections.Generic;

namespace DealsDate_Backend.Repository
{
    public interface IAddressRepository
    {
        IEnumerable<Address> GetAddress(string customerId);
        Address GetAddressByID(long AddressId);

        Address GetAddressByCustomerID(string CustomerId);
        void DeleteAddress(long AddressId);
        void UpdateAddress(Address address);
        void InsertAddress(Address address);
        void Save();
    }
}