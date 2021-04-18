namespace Cmc.Ecommerce.Api.Dtos
{
	// DTO to return to the user after POST
	public class CheckoutDto
	{
		public double Price { get; set; }
		public double ShippingPrice { get; set; }
	}
}