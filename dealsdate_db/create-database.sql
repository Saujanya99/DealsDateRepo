CREATE DATABASE [DealsDate]
GO

USE [DealsDate]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Addresses](
	[AddressId] [bigint] IDENTITY(1,1) NOT NULL,
	[CustomerId] [nvarchar](max) NULL,
	[AddressDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Carts](
	[productCartId] [bigint] IDENTITY(1,1) NOT NULL,
	[customerId] [nvarchar](max) NOT NULL,
	[productId] [bigint] NOT NULL,
	[productQuantity] [int] NOT NULL,
	[productTotal] [bigint] NOT NULL,
 CONSTRAINT [PK_Carts] PRIMARY KEY CLUSTERED 
(
	[productCartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Events](
	[EventId] [bigint] IDENTITY(1,1) NOT NULL,
	[EventCategory] [nvarchar](max) NULL,
	[EventDate] [datetime2](7) NOT NULL,
	[EventName] [nvarchar](max) NOT NULL,
	[CustomerID] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Orders](
	[OrderId] [bigint] IDENTITY(1,1) NOT NULL,
	[productId] [bigint] NOT NULL,
	[customerId] [nvarchar](max) NOT NULL,
	[customerAddress] [nvarchar](max) NOT NULL,
	[productName] [nvarchar](max) NOT NULL,
	[productPrice] [float] NOT NULL,
	[productQuantity] [int] NOT NULL,
	[totalCost] [float] NOT NULL,
	[deliveryStatus] [nvarchar](max) NULL,
	[sellerId] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Products](
	[productId] [bigint] IDENTITY(1,1) NOT NULL,
	[productName] [nvarchar](max) NOT NULL,
	[productDescription] [nvarchar](max) NULL,
	[productPrice] [float] NOT NULL,
	[productMRP] [float] NOT NULL,
	[productCategory] [nvarchar](max) NOT NULL,
	[productImageLink] [nvarchar](max) NOT NULL,
	[sellerId] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[productId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Wishlist](
	[WishListProductId] [bigint] IDENTITY(1,1) NOT NULL,
	[ProductId] [bigint] NOT NULL,
	[CustomerId] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Wishlist] PRIMARY KEY CLUSTERED 
(
	[WishListProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO