import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

export default function Catalog() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) {
    return <h1>Loading products...</h1>;
  }
  return (
    <>
      <ProductList products={data} />
    </>
  );
}
