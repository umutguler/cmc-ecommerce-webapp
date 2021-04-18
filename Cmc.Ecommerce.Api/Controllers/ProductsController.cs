using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cmc.Ecommerce.Api.Data;
using Cmc.Ecommerce.Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cmc.Ecommerce.Api.Controllers
{
	public class ProductsController : BaseApiController
	{
		// Database context (in-memory as this is for testing purposes)
		private readonly DataContext _context;
		public ProductsController(DataContext context)
		{
			_context = context;
		}

		// Gets all products
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
		{

			return await _context.Products.ToListAsync();
		}

		// Gets individual product by id
		[HttpGet("{id}")]
		public async Task<ActionResult<Product>> GetProduct(int id)
		{
			return await _context.Products.FindAsync(id);
		}

		// Gets multiple individual product by id array
		// Inputs array ass url/?id=1&id=2&id=3... etc
		[HttpGet("query")]
		public async Task<ActionResult<IEnumerable<Product>>> GetProductsByIds([FromQuery] int[] id)
		{
			return await _context.Products.Where(p => id.Contains(p.Id)).ToListAsync();
		}
	}
}