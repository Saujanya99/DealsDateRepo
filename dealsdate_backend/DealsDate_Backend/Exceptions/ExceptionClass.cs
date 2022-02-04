using System;

namespace DealsDate_Backend.Exceptions
{
    public class ExceptionClass : Exception
    {

        public class InvalidInputException : Exception
        {
            public InvalidInputException(string msg) : base(msg)
            {
                Console.WriteLine("Invalid data");
            }
        }

        public class DataCannotBeFoundException : Exception
        {
            public DataCannotBeFoundException(string msg) : base(msg)
            {
                Console.WriteLine("No valid Data could be found");
            }
        }
        public class ProductOutOfStockException : Exception
        {
            public ProductOutOfStockException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class ProductCouldNotBeFoundException : Exception
        {
            public ProductCouldNotBeFoundException(string exceptionMessage) : base(exceptionMessage)
            { }
        }

        public class EventDateBeforeTodayException : Exception
        {
            public EventDateBeforeTodayException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class NoEventSelectedException : Exception
        {
            public NoEventSelectedException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class NoAddressDetailsException : Exception
        {
            public NoAddressDetailsException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class NoSuchDiscountCodeExistsException : Exception
        {
            public NoSuchDiscountCodeExistsException(string exceptionMessage) : base(exceptionMessage)
            { }
        }

        public class NoPaymentMethodSelectedException : Exception
        {
            public NoPaymentMethodSelectedException(string exceptionMessage) : base(exceptionMessage)
            { }
        }

        public class EnteredCardDetailsDoNotMatchException : Exception
        {
            public EnteredCardDetailsDoNotMatchException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class PasswordCouldNotBeChangedException : Exception
        {
            public PasswordCouldNotBeChangedException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class PaymentDeclineException : Exception
        {
            public PaymentDeclineException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }

        #region Wishlist Exception
        public class ProductNotAddedToWishlistException : Exception
        {
            public ProductNotAddedToWishlistException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }

        public class GetWishlistProductByCustomerId : Exception
        {
            public GetWishlistProductByCustomerId(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }



        public class ProductNotRemovedFromWishlistException : Exception
        {
            public ProductNotRemovedFromWishlistException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        #endregion

        #region AddItemToCart Exception
        public class ProductNotAddedToCartException : Exception
        {
            public ProductNotAddedToCartException(string exceptionMessage) : base(exceptionMessage)
            { }
        }

        public class ProductNotRemovedFromCartException : Exception
        {
            public ProductNotRemovedFromCartException(string exceptionMessage) : base(exceptionMessage)
            { }
        }
        public class GetAllCartItemsByCustomerId : Exception
        {
            public GetAllCartItemsByCustomerId(string exceptionMessage) : base(exceptionMessage)
            { }
        }
        #endregion


        #region Address Exception 
        public class GetAllAddressException : Exception
        {
            public GetAllAddressException(string exceptionMessage) : base(exceptionMessage)
            { }
        }

        public class AddressNotAddedSuccessfullyException : Exception
        {
            public AddressNotAddedSuccessfullyException(string exceptionMessage) : base(exceptionMessage)
            { }
        }

        public class AddressNotRemovedSuccessfullyException : Exception
        {
            public AddressNotRemovedSuccessfullyException(string exceptionMessage) : base(exceptionMessage)
            {
            }
        }
        #endregion

        #region Event Exception 
        public class EventNotRemovedSuccessfullyException : Exception
        {
            public EventNotRemovedSuccessfullyException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class GetEventByIdException : Exception
        {
            public GetEventByIdException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class EventNotCreatedSuccessfullyException : Exception
        {
            public EventNotCreatedSuccessfullyException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        #endregion

        #region Order Exception 
        public class OrderNotRemovedSuccessfullyException : Exception
        {
            public OrderNotRemovedSuccessfullyException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class OrderNotAddedSuccessfullyException : Exception
        {
            public OrderNotAddedSuccessfullyException(string exceptionMessage) : base(exceptionMessage) { }
        }
        #endregion

        #region Product Exception 

        public class ProductNotAddedException : Exception
        {
            public ProductNotAddedException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class ProductNotRemoved : Exception
        {
            public ProductNotRemoved(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }

        public class GetAllProductException : Exception
        {
            public GetAllProductException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        public class GetProductByIdException : Exception
        {
            public GetProductByIdException(string exceptionMessage) : base(exceptionMessage)
            {

            }
        }
        #endregion

    }
}
