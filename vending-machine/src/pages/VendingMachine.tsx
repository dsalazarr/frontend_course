import { Button, Grid, Typography } from "@mui/material";
import { Products } from "../components/Products";
import { AddMoney } from "../components/AddMoney";
import { Balance } from "../components/Balance";
import { useEffect, useState } from "react";
import payload from "../mocks/products.json";
import { ProductProps } from "../components/Product";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api";
import { RefundMoney } from "../components/RefundMoney";
import {
  selectUserBalance,
  selectUserId,
  selectUserName,
  updateBalance,
} from "../features/vendingMachineSlice";

export const VendingMachine = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const userId = useSelector(selectUserId);
  const balance = useSelector(selectUserBalance);
  const addMoneyAmounts = [0.1, 0.2, 0.5, 1, 2, 5];
  const renderComponent = (
    isLoading: boolean,
    error: any,
    products: ProductProps[]
  ) => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (error) {
      return <div>Error {error}</div>;
    }

    return <Products products={products} />;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response: any = await api.getProducts();
        const products = response.data.reduce((result: any, item: any) => {
          if (item.product !== null) {
            result.push({
              id: item.id,
              name: item.product.name,
              price: item.product.price,
            });
          }
          return result;
        }, []);
        setProducts(products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);

  const addMoney = async (quantity: number) => {
    if (!userId) return;
    try {
      await api.addMoney(userId, quantity);
      dispatch(updateBalance(balance + quantity));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2} mt={5} ml={4} mr={4}>
      <Grid item xs={12}>
        <Typography>{username} Vending Machine</Typography>
      </Grid>
      <Grid item xs={8}>
        {renderComponent(isLoading, error, products)}
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AddMoney addMoneyCallback={addMoney} amounts={addMoneyAmounts} />
          </Grid>
          <Grid item xs={12}>
            <Balance />
          </Grid>
          <Grid item xs={12}>
            <RefundMoney />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
