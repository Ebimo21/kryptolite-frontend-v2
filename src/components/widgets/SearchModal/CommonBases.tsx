import React from "react";
import cls from "classnames";
import { ChainId, SUGGESTED_BASES } from "../../../config/constants";
import { Currency, ETHER } from "../../../config/entities/currency";
import { currencyEquals, Token } from "../../../config/entities/token";
import CurrencyLogo from "../../Logo/CurrencyLogo";
import QuestionHelper from "../../QuestionHelper/QuestionHelper";

const BaseWrapper: React.FC<{ disable?: boolean; clickHandler: () => void }> = ({
  disable,
  clickHandler,
  children,
}) => {
  return (
    <div
      className={cls("border rounded-xl flex p-2 items-center", {
        "border-transparent opacity-40": disable,
        "hover:cursor-pointer": !disable,
      })}
      onClick={clickHandler}
    >
      {children}
    </div>
  );
};

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
}: {
  chainId?: ChainId;
  selectedCurrency?: Currency | null;
  onSelect: (currency: Currency) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex">
        <p>Common bases</p>
        <QuestionHelper text="These tokens are commonly paired with other tokens." />
      </div>
      <div className="flex">
        <BaseWrapper
          clickHandler={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER);
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <p>BNB</p>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : []).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address;
          return (
            <BaseWrapper clickHandler={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8, borderRadius: "50%" }} />
              <p>{token.symbol}</p>
            </BaseWrapper>
          );
        })}
      </div>
    </div>
  );
}
