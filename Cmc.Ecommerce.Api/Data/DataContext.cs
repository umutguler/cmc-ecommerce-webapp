using Cmc.Ecommerce.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cmc.Ecommerce.Api.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }
		public DbSet<Product> Products { get; set; }

	}
}