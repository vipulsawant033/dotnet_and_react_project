import { Grid2 } from "@mui/material";
import type { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
type Props = {
  products: Product[];
};
export default function ProductList({ products }: Props) {
  return (
    <div>
      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 size={3} display={"flex"} key={product.id}>
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}
