import React from "react";
import { useRef, RefObject, useCallback, useState, useMemo } from "react";
import { Token } from "../../../config/entities/token";
import { useToken } from "../../../hooks/Tokens";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useRemoveUserAddedToken } from "../../../state/user/hooks";
import useUserAddedTokens from "../../../state/user/hooks/useUserAddedTokens";
import { isAddress } from "../../../utils";
import { getBscScanLink } from "../../../utils/getBscScanLink";
import Button from "../../Buttons/Button";
import Link from "../../Link";
import CurrencyLogo from "../../Logo/CurrencyLogo";
import CloseIcon from "../../Svg/Icons/Close";
import ImportRow from "./ImportRow";
import { CurrencyModalView } from "./types";

export default function ManageTokens({
  setModalView,
  setImportToken,
}: {
  setModalView: (view: CurrencyModalView) => void;
  setImportToken: (token: Token) => void;
}) {
  const { chainId } = useActiveWeb3React();

  const [searchQuery, setSearchQuery] = useState<string>("");

  // manage focus on modal show
  const inputRef = useRef<HTMLInputElement>();
  const handleInput = useCallback((event) => {
    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
  }, []);

  // if they input an address, use it
  const searchToken = useToken(searchQuery);

  // all tokens for local list
  const userAddedTokens: Token[] = useUserAddedTokens();
  const removeToken = useRemoveUserAddedToken();

  const handleRemoveAll = useCallback(() => {
    if (chainId && userAddedTokens) {
      userAddedTokens.forEach((token) => {
        return removeToken(chainId, token.address);
      });
    }
  }, [removeToken, userAddedTokens, chainId]);

  const tokenList = useMemo(() => {
    return (
      chainId &&
      userAddedTokens.map((token) => (
        <div className="flex justify-between w-full" key={token.address}>
          <div className="flex">
            <CurrencyLogo currency={token} size="20px" />
            <Link to={getBscScanLink(token.address, "address", chainId)} className="ml-3">
              {token.symbol}
            </Link>
          </div>
          <div className="flex">
            <Button onClick={() => removeToken(chainId, token.address)}>
              <CloseIcon />
            </Button>
            <Link to={getBscScanLink(token.address, "address", chainId)} />
          </div>
        </div>
      ))
    );
  }, [userAddedTokens, chainId, removeToken]);

  const isAddressValid = searchQuery === "" || isAddress(searchQuery);

  return (
    <div className="w-full h-[calc(100%-60px)] relative pb-[60px]">
      <div className="flex flex-col" style={{ width: "100%", flex: "1 1" }}>
        <div className="flex flex-col gap-4">
          <div className="flex">
            <input
              id="token-search-input"
              placeholder="0x0000"
              value={searchQuery}
              autoComplete="off"
              ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
              //   isWarning={!isAddressValid}
            />
          </div>
          {!isAddressValid && <p className="text-red-500">Enter valid token address</p>}
          {searchToken && (
            <ImportRow
              token={searchToken}
              showImportView={() => setModalView(CurrencyModalView.importToken)}
              setImportToken={setImportToken}
              style={{ height: "fit-content" }}
            />
          )}
        </div>
        {tokenList}
        <div className="absolute bottom-0 w-full flex justify-between items-center">
          <p className="font-bold">
            {userAddedTokens?.length} {userAddedTokens.length === 1 ? "Custom Token" : "Custom Tokens"}
          </p>
          {userAddedTokens.length > 0 && <Button onClick={handleRemoveAll}>Clear all</Button>}
        </div>
      </div>
    </div>
  );
}
