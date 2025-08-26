namespace API.Data;

public class BasketItemDTO
{
    public int productId { get; set; }
    public int Quantity { get; set; }
    public required string Name { get; set; }
    public long Price { get; set; }
    public required string PictureUrl { get; set; }
    public required string Type { get; set; }
    public required string Brand { get; set; }
}