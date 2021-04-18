using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cmc.Ecommerce.Api.Data;
using Cmc.Ecommerce.Api.Dtos;
using Cmc.Ecommerce.Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Cmc.Ecommerce.Api.Controllers
{
	public class CheckoutController : BaseApiController
	{
		private readonly DataContext _context;
		public CheckoutController(DataContext context)
		{
			_context = context;
		}

		// These two methods are the same but different endpoints for sake of simulation
		// Input: A list of objects that represent the ID:Quantity
		// Output: Price of Shipping & Item total price
		[HttpPost("calculate")]
		public async Task<ActionResult<CheckoutDto>> CalculateOrder(List<CartItemDto> cartDto)
		{
			return await CalculateCost(cartDto);
		}

		[HttpPost("placeorder")]
		public async Task<ActionResult<CheckoutDto>> PlaceOrder(List<CartItemDto> cartDto)
		{
			return await CalculateCost(cartDto);
		}

		// Calculates the shipping cost and total item price
		private async Task<CheckoutDto> CalculateCost(List<CartItemDto> cartDto)
		{
			double price = 0.0;

			foreach (var item in cartDto)
			{
				Product product = await _context.Products.FindAsync(item.Id);
				price += (product.Price * (double)item.Quantity);
			}

			double shippingPrice = (price <= 50.0) ? 10.0 : 20.0;

			return new CheckoutDto()
			{
				Price = price,
				ShippingPrice = shippingPrice
			};
		}
	}
}