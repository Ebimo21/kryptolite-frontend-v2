import { createReducer } from "@reduxjs/toolkit";
import { updateGasPrice } from "./actions";

import { GAS_PRICE_GWEI } from "./hooks/helpers";

export interface UserState {
  gasPrice: string;
}

export const initialState: UserState = {
  gasPrice: GAS_PRICE_GWEI.default,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateGasPrice, (state, action) => {
    state.gasPrice = action.payload.gasPrice;
  })
);
