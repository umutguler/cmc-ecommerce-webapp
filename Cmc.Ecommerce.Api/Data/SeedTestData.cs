using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Cmc.Ecommerce.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Cmc.Ecommerce.Api.Data
{
	public class SeedTestData
	{
		public static void Initialize(IServiceProvider serviceProvider)
		{
			using (var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
			{
				if (context.Products.Any())
				{
					return;
				}

				string jsonString = File.ReadAllText("Data/seed.json");
				List<Product> products = JsonConvert.DeserializeObject<List<Product>>(jsonString);

				context.AddRange(products);
				context.SaveChanges();
			};
		}
	}
}