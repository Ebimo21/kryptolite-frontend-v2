import React, { CSSProperties } from "react";
import { Token } from "../../../config/entities/token";
import { useIsUserAddedToken, useIsTokenActive } from "../../../hooks/Tokens";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useCombinedInactiveList } from "../../../state/lists/hooks";
import Button from "../../Buttons/Button";
import CurrencyLogo from "../../Logo/CurrencyLogo";
import ListLogo from "../../Logo/ListLogo";
import CheckmarkCircleIcon from "../../Svg/Icons/CheckmarkCircle";

export default function ImportRow({
  token,
  dim,
  showImportView,
  setImportToken,
}: {
  token: Token;
  style?: CSSProperties;
  dim?: boolean;
  showImportView: () => void;
  setImportToken: (token: Token) => void;
}) {
  // globals
  const { chainId } = useActiveWeb3React();

  // check if token comes from list
  const inactiveTokenList = useCombinedInactiveList();
  const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list;

  // check if already active on list or local storage tokens
  const isAdded = useIsUserAddedToken(token);
  const isActive = useIsTokenActive(token);

  return (
    <div
      className="py-1 px-20 h-14 grid gap-3 items-center md:gap-4"
      style={{ gridTemplateColumns: "auto minmax(auto, 1fr) auto" }}
    >
      <CurrencyLogo currency={token} style={{ opacity: dim ? "0.6" : "1" }} />
      <div className="flex flex-col gap-1" style={{ opacity: dim ? "0.6" : "1" }}>
        <div className="flex">
          <p className="mr-2">{token.symbol}</p>
          <p className="text-gray-100">
            <div
              className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[140px] text-xs"
              title={token.name}
            >
              {token.name}
            </div>
          </p>
        </div>
        {list && list.logoURI && (
          <div className="flex">
            <p className="text-xs md:text-sm mr-1">via {list.name}</p>
            <ListLogo logoURI={list.logoURI} size="12px" />
          </div>
        )}
      </div>
      {!isActive && !isAdded ? (
        <Button
          onClick={() => {
            if (setImportToken) {
              setImportToken(token);
            }
            showImportView();
          }}
        >
          Import
        </Button>
      ) : (
        <div className="max-w-fit">
          <CheckmarkCircleIcon className="h-4 w-4 mr-2 ring ring-primary-600" />
          <p className="text-primary-600">Active</p>
        </div>
      )}
    </div>
  );
}
