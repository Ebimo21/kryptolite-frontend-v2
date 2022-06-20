import { ChainId } from "../../../config/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../";
import { GAS_PRICE_GWEI, serializeToken } from "./helpers";
import { useCallback } from "react";
import { addSerializedToken, updateUserSingleHopOnly } from "../actions";
import { Token } from "../../../config/entities/token";

export function useGasPrice(): string {
  const chainId = process.env.GATSBY_CHAIN_ID!;
  const userGas = useSelector<AppState, AppState["user"]["gasPrice"]>((state) => state.user.gasPrice);
  return chainId === ChainId.MAINNET.toString() ? userGas : GAS_PRICE_GWEI.testnet;
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>();

  const singleHopOnly = useSelector<AppState, AppState["user"]["userSingleHopOnly"]>(
    (state) => state.user.userSingleHopOnly,
  );

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }));
    },
    [dispatch],
  );

  return [singleHopOnly, setSingleHopOnly];
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
    },
    [dispatch],
  );
}
