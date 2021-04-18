using System.ComponentModel.DataAnnotations;

namespace Cmc.Ecommerce.Api.Dtos
{
	// DTO for user to POST
	public class CartItemDto
	{
		[Required]
		public int Id { get; set; }
		[Required]
		public int Quantity { get; set; }
	}

}