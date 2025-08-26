using System;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDTO>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NoContent();

        return basket.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        basket ??= Createbasket();

        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem adding item to basket");

        basket.AddItem(product, quantity);
        var result = await context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());

        return BadRequest("Problem adding item to basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null) return BadRequest("Problem removing item from basket");

        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Problem removing item from basket");

        basket.RemoveItem(productId, quantity);
        var result = await context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem removing item from basket");
    }

    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(b => b.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(b => b.BasketId == Request.Cookies["basketId"]);
    }

    private Basket Createbasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.UtcNow.AddDays(30) };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }

}
