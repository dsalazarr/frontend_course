import { Alert, Grid } from "@mui/material";
import { Product, ProductProps } from "./Product";
import { FC, useState } from "react";
import { api } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, updateBalance } from "../features/vendingMachineSlice";
import { RootState } from "../store";
import { ProductItem } from "../models/ProductItem";

type ProductsProps = {
  products: ProductProps[] | null;
};

export const Products: FC<ProductsProps> = ({ products }) => {
  const dispatch = useDispatch();

  const balance = useSelector(
    (state: RootState) => state.vendingMachine.balance
  );
  const userId = useSelector(selectUserId);

  const [error, setError] = useState<string | null>(null);

  const buyProduct = async (productItem: ProductItem) => {
    if (!userId) return;
    if (balance < productItem.price) {
      setError("Not enough balance");
      return;
    }
    try {
      await api.buyProduct(userId, productItem.id);
      dispatch(updateBalance(balance - productItem.price));
      setError(null);
    } catch (error) {
      //handle error
    }
  };

  let errorComp;
  if (error) {
    errorComp = <Alert severity="error">{error}</Alert>;
  }
  return (
    <>
      {errorComp}
      <Grid container spacing={2}>
        {products?.map((productItem: ProductProps) => {
          return (
            <Grid item>
              <Product
                id={productItem.id}
                name={productItem.name}
                price={productItem.price}
                buyProduct={buyProduct}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
