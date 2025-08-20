import { useEffect, useState } from "react";
import type { Product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://localhost:5001/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
