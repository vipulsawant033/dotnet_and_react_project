using System;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions<StoreContext> options) : IdentityDbContext<User>(options)
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<Order> Orders { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "d015949d-6de2-4a9a-9c6d-108a70004104", Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Id = "2a046c19-2ec2-4af5-9e01-2e283c6497a7", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
}