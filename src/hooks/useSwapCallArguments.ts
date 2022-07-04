import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import useActiveWeb3React from "./useActiveWeb3React";
import JSBI from "jsbi";
import { SwapParameters, Router } from "../config/constants/router";
import { TradeType } from "../config/constants/types";
import { Percent } from "../config/entities/fractions/percent";
import { Trade } from "../config/entities/trade";
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from "../config/constants";
import { getRouterContract } from "../utils";

interface SwapCall {
  contract: Contract;
  parameters: SwapParameters;
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName
 */
export function useSwapCallArguments(
  trade: Trade | undefined, // trade to execute, required
  allowedSlippage: number = INITIAL_ALLOWED_SLIPPAGE, // in bips
): SwapCall[] {
  const { account, chainId, library } = useActiveWeb3React();

  return useMemo(() => {
    if (!trade || !account || !library || !account || !chainId) return [];

    const contract = getRouterContract(library, account);
    if (!contract) {
      return [];
    }

    const swapMethods = [];

    swapMethods.push(
      Router.swapCallParameters(trade, {
        feeOnTransfer: false,
        allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
      }),
    );

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      swapMethods.push(
        Router.swapCallParameters(trade, {
          feeOnTransfer: true,
          allowedSlippage: new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE),
        }),
      );
    }

    return swapMethods.map((parameters) => ({ parameters, contract }));
  }, [account, allowedSlippage, chainId, library, trade]);
}
