import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Balance = () => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachine.balance
  );
  return (
    <Paper variant="outlined" elevation={8}>
      <Typography>Balance: {balance.toFixed(2)}E</Typography>
    </Paper>
  );
};
