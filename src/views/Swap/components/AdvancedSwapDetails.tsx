import React from "react";
import QuestionHelper from "../../../components/QuestionHelper/QuestionHelper";
import { TradeType } from "../../../config/constants/types";
import { Trade } from "../../../config/entities/trade";
import { computeTradePriceBreakdown } from "../../../utils/prices";
import FormattedPriceImpact from "./FormatedPriceImpact";
import SwapRoute from "./SwapRoute";

function TradeSummary({ trade }: { trade: Trade }) {
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade);

  return (
    <div className="flex flex-col" style={{ padding: "0 16px" }}>
      <div className="flex">
        <div className="flex">
          <p className="text-sm">{isExactIn ? "Minimum received" : "Maximum sold"}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <p className="text-sm">Liquidity Provider Fee</p>
          <QuestionHelper
            text={
              <>
                <p className="mb-3">For each trade a 0.25% fee is paid</p>
                <p>- 0.17% to LP token holders</p>
              </>
            }
          />
        </div>
        <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        <p>{realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : "-"}</p>
      </div>
    </div>
  );
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade;
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const showRoute = Boolean(trade && trade.route.path.length > 2);

  return (
    <div className="flex flex-col gap-0">
      {trade && (
        <>
          <TradeSummary trade={trade} />
          {showRoute && (
            <>
              <div className="flex py-0 px-4">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <p className="text-sm">Route</p>
                  <QuestionHelper text="Routing through these tokens resulted in the best price for your trade." />
                </span>
                <SwapRoute trade={trade} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
