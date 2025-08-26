using System;

namespace API.Data;

public class BasketDTO
{
    public string BasketId { get; set; } = string.Empty;
    public List<BasketItemDTO> Items { get; set; } = [];

}
