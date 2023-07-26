import { useDispatch, useSelector } from "react-redux";
import { selectUserId, updateBalance } from "../features/vendingMachineSlice";
import { Button } from "@mui/material";
import { api } from "../api";

export const RefundMoney = () => {
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!userId) {
      return;
    }
    try {
      await api.refundMoney(userId);
      dispatch(updateBalance(0));
    } catch (error) {
      // handle
    }
  };

  return (
    <Button variant="contained" onClick={() => handleClick()}>
      Refund money
    </Button>
  );
};
