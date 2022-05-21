import { ChainId } from "../../../config/constants";
import { useSelector } from "react-redux";
import { AppState } from "../../";
import { GAS_PRICE_GWEI } from "./helpers";

export function useGasPrice(): string {
  const chainId = process.env.GATSBY_CHAIN_ID!;
  const userGas = useSelector<AppState, AppState["user"]["gasPrice"]>(
    (state) => state.user.gasPrice
  );
  return chainId === ChainId.MAINNET.toString()
    ? userGas
    : GAS_PRICE_GWEI.testnet;
}
