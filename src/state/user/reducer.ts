import { createReducer } from "@reduxjs/toolkit";
import { SerializedToken } from "../../config/constants/types";
import { updateGasPrice, addSerializedToken, removeSerializedToken } from "./actions";
import { GAS_PRICE_GWEI } from "./hooks/helpers";

const currentTimestamp = () => new Date().getTime();

export interface UserState {
  gasPrice: string;
  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken;
    };
  };
  timestamp: number;
  // only allow swaps on direct pairs
  userSingleHopOnly: boolean;
}

export const initialState: UserState = {
  gasPrice: GAS_PRICE_GWEI.default,
  tokens: {},
  timestamp: currentTimestamp(),
  userSingleHopOnly: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateGasPrice, (state, action) => {
      state.gasPrice = action.payload.gasPrice;
    })
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {};
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
      state.timestamp = currentTimestamp();
    })
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
      if (!state.tokens) {
        state.tokens = {};
      }
      state.tokens[chainId] = state.tokens[chainId] || {};
      delete state.tokens[chainId][address];
      state.timestamp = currentTimestamp();
    }),
);
