using System;
using API.Entities;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        query = orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };

        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return query;
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, string? brands, string? types)
    {
        var brandList = new List<string>();
        var typeList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
            brandList = [.. brands.Split(',').Select(b => b.Trim().ToLower())];

        if (!string.IsNullOrEmpty(types))
            typeList = types.Split(',').Select(t => t.Trim().ToLower()).ToList();

        if (brandList.Count > 0)
            query = query.Where(p => brandList.Contains(p.Brand.ToLower()));

        if (typeList.Count > 0)
            query = query.Where(p => typeList.Contains(p.Type.ToLower()));

        return query;
    }
}
