import { useParams } from "react-router";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/basketApi";
import { useEffect, useState } from "react";

export default function About() {
  const { id } = useParams<{ id: string }>();

  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((i) => i.productId === +id!);
  const [quantity, setQuantity] = useState(item ? item.quantity : 0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? +id : 0
  );

  if (isLoading || !product) {
    return <h1>Loading product...</h1>;
  }

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if (value >= 0) setQuantity(value);
  };

  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in stock", value: product.quantityInStock },
  ];

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3" gutterBottom>
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary" gutterBottom>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {productDetails.map((detail) => (
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">{detail.label}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{detail.value}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} sx={{ mt: 3 }}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              defaultValue={quantity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              sx={{ height: "55px" }}
              onClick={handleUpdateBasket}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
            >
              {item ? "Update Quantity" : "Add to Basket"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
