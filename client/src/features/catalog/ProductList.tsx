import { Box } from "@mui/material";
import type { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
type Props = {
  products: Product[];
};
export default function ProductList({ products }: Props) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </div>
  );
}
