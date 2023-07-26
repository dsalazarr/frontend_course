import { Button, Card, Divider, Stack, Typography } from "@mui/material";
import { ProductItem } from "../models/ProductItem";
import { UUID } from "crypto";

export interface ProductProps {
  id: UUID;
  name: string;
  price: number;
  buyProduct: (productItem: ProductItem) => void;
}

export const Product = ({ id, name, price, buyProduct }: ProductProps) => {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <Stack sx={{ p: 2, display: "flex" }} spacing={2}>
        <Typography fontSize={21} fontWeight={700}>
          {name}
        </Typography>
        <Typography>{price}€</Typography>
      </Stack>
      <Divider />
      <Stack gap={4} sx={{ px: 2, py: 1 }}>
        <Button
          variant="contained"
          onClick={() =>
            buyProduct({
              id,
              name,
              price,
            })
          }
        >
          Buy
        </Button>
      </Stack>
    </Card>
  );
};
