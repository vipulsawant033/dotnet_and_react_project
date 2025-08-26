using System;
using API.Data;
using API.Entities;

namespace API.Extensions;

public static class BasketExtensions
{
    public static BasketDTO ToDto(this Basket basket)
    {
        return new BasketDTO
        {
            BasketId = basket.BasketId,
            Items = [.. basket.Items.Select(item => new BasketItemDTO
            {
                productId = item.ProductId,
                Name = item.Product.Name,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity
            })]
        };
    }
}
