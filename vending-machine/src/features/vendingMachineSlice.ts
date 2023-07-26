import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UUID } from "crypto";

export interface VendingMachineState {
  userId: UUID | null;
  name: string | null;
  balance: number;
}

const initialState: VendingMachineState = {
  userId: null,
  name: null,
  balance: 0,
};

export const vendingMachineSlice = createSlice({
  name: "vendingMachine",
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    setUserId: (state, action: PayloadAction<UUID | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { updateBalance, setName, setUserId } =
  vendingMachineSlice.actions;
export const selectUserName = (state: RootState) => state.vendingMachine.name;
export const selectUserId = (state: RootState) => state.vendingMachine.userId;
export const selectUserBalance = (state: RootState) =>
  state.vendingMachine.balance;

export default vendingMachineSlice.reducer;
