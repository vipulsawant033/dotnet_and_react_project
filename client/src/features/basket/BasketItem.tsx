import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material";
import type { Item } from "../../app/models/basket";
import { Add, Close, Remove } from "@mui/icons-material";
import {
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} from "./basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
  item: Item;
};
export default function BasketItem({ item }: Props) {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();

  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "4px",
            marginRight: 8,
            ml: 4,
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{item.name}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }}>
              {currencyFormat(item.price)} x {item.quantity}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem" }} color="primary">
              {currencyFormat(item.price * item.quantity)}
            </Typography>
          </Box>

          <Grid2 container spacing={1} alignItems={"center"}>
            <IconButton
              color="error"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
              onClick={() =>
                removeBasketItem({ productId: item.productId, quantity: 1 })
              }
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
              onClick={() => addBasketItem({ product: item, quantity: 1 })}
            >
              <Add />
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <IconButton
        color="error"
        size="small"
        sx={{
          border: 1,
          borderRadius: 1,
          minWidth: 0,
          alignSelf: "start",
          mr: 2,
          mt: 2,
        }}
        onClick={() =>
          removeBasketItem({
            productId: item.productId,
            quantity: item.quantity,
          })
        }
      >
        <Close />
      </IconButton>
    </Paper>
  );
}
