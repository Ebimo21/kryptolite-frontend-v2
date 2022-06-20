import JSBI from "jsbi";
import React, { Fragment } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../../components/Buttons/Button";
import ConnectWalletButton from "../../components/Buttons/ConnectWalletButton";
import ImportTokenWarningModal from "../../components/ImportTokenWarningModal";
import Footer from "../../components/Layouts/Footer";
import Row from "../../components/Layouts/Row";
import useModal from "../../components/Modal/useModal";
import Skeleton from "../../components/widgets/Skeleton";
import { CurrencyAmount } from "../../config/entities/fractions/currencyAmount";
import { Token } from "../../config/entities/token";
import { Trade } from "../../config/entities/trade";
import { useAllTokens, useCurrency } from "../../hooks/Tokens";
import { useIsTransactionUnsupported } from "../../hooks/Trades";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { ApprovalState, useApproveCallbackFromTrade } from "../../hooks/useApprovalCallback";
import { useSwapCallback } from "../../hooks/useSwapCallback";
import useWrapCallback, { WrapType } from "../../hooks/useWrapCallback";
import { Field } from "../../state/swap/actions";
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSingleTokenSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from "../../state/swap/hooks";
import { useUserSingleHopOnly } from "../../state/user/hooks";
import { useUserSlippageTolerance } from "../../utils/calls/swap";
import { maxAmountSpend } from "../../utils/maxAmountSpend";
import { computeTradePriceBreakdown, warningSeverity } from "../../utils/prices";
import shouldShowSwapWarning from "../../utils/shouldShowSwapWarning";
import ConfirmSwapModal from "./components/ConfirmSwapModal";
import CurrencyInputHeader from "./components/CurrencyInputHeader";
import SwapWarningModal from "./components/SwapWarningModal";
import useRefreshBlockNumberID from "./hooks/useRefreshBlockNumber";

const SwitchIconButton = styled(IconButton)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  .icon-up-down {
    display: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    .icon-down {
      display: none;
      fill: white;
    }
    .icon-up-down {
      display: block;
      fill: white;
    }
  }
`;

export default function Swap() {
  const router = useRouter();
  const loadedUrlParams = useDefaultsFromURLSearch();
  const { refreshBlockNumber, isLoading } = useRefreshBlockNumberID();
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ];
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  );

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens();
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !(token.address in defaultTokens);
    });

  const { account } = useActiveWeb3React();

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();

  // swap state & price data
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState();
  const inputCurrency = useCurrency(inputCurrencyId);
  const outputCurrency = useCurrency(outputCurrencyId);
  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo(independentField, typedValue, inputCurrency, outputCurrency);

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue);
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const trade = showWrap ? undefined : v2Trade;

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency);

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      };

  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers();
  const isValid = !swapInputError;
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput],
  );
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput],
  );

  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined;
    attemptingTxn: boolean;
    swapErrorMessage: string | undefined;
    txHash: string | undefined;
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  });

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ""
      : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
  };

  const route = trade?.route;
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  );
  const noRoute = !route;

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT]);
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput));

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage);

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);

  const [singleHopOnly] = useUserSingleHopOnly();

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee) {
      return;
    }
    if (!swapCallback) {
      return;
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined });
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash });
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        });
      });
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm]);

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false);

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3);

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, "");
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn });
  }, [attemptingTxn, swapErrorMessage, trade, txHash]);

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null);
  const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />, false);

  useEffect(() => {
    if (swapWarningCurrency) {
      onPresentSwapWarningModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency]);

  const handleInputSelect = useCallback(
    (currencyInput) => {
      setApprovalSubmitted(false); // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, currencyInput);
      const showSwapWarning = shouldShowSwapWarning(currencyInput);
      if (showSwapWarning) {
        setSwapWarningCurrency(currencyInput);
      } else {
        setSwapWarningCurrency(null);
      }
    },
    [onCurrencySelection],
  );

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact());
    }
  }, [maxAmountInput, onUserInput]);

  const handleOutputSelect = useCallback(
    (currencyOutput) => {
      onCurrencySelection(Field.OUTPUT, currencyOutput);
      const showSwapWarning = shouldShowSwapWarning(currencyOutput);
      if (showSwapWarning) {
        setSwapWarningCurrency(currencyOutput);
      } else {
        setSwapWarningCurrency(null);
      }
    },

    [onCurrencySelection],
  );

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT);

  const [onPresentImportTokenWarningModal] = useModal(
    <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => router.push("/swap")} />,
  );

  useEffect(() => {
    if (importTokensNotInDefault.length > 0) {
      onPresentImportTokenWarningModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importTokensNotInDefault.length]);

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    "confirmSwapModal",
  );

  const hasAmount = Boolean(parsedAmount);

  const onRefreshPrice = useCallback(() => {
    if (hasAmount) {
      refreshBlockNumber();
    }
  }, [hasAmount, refreshBlockNumber]);

  return (
    <div>
      <div className="w-full justify-center relative">
        <div className="flex flex-col">
          <div>
            <div className="w-[328px]">
              <CurrencyInputHeader
                title={"Swap"}
                subtitle={"Trade tokens in an instant"}
                hasAmount={hasAmount}
                onRefreshPrice={onRefreshPrice}
              />
              <div id="swap-page" style={{ minHeight: "412px" }}>
                <div className="flex flex-col gap-4">
                  <CurrencyInputPanel
                    label={independentField === Field.OUTPUT && !showWrap && trade ? "From (estimated)" : "From"}
                    value={formattedAmounts[Field.INPUT]}
                    showMaxButton={!atMaxAmountInput}
                    currency={currencies[Field.INPUT]}
                    onUserInput={handleTypeInput}
                    onMax={handleMaxInput}
                    onCurrencySelect={handleInputSelect}
                    otherCurrency={currencies[Field.OUTPUT]}
                    id="swap-currency-input"
                  />
                  //===========
                  <AutoColumn justify="space-between">
                    <AutoRow justify={"center"} style={{ padding: "0 1rem" }}>
                      <SwitchIconButton
                        variant="light"
                        scale="sm"
                        onClick={() => {
                          setApprovalSubmitted(false); // reset 2 step UI for approvals
                          onSwitchTokens();
                        }}
                      >
                        <ArrowDownIcon
                          className="icon-down"
                          color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? "primary" : "text"}
                        />
                        <ArrowUpDownIcon
                          className="icon-up-down"
                          color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? "primary" : "text"}
                        />
                      </SwitchIconButton>
                    </AutoRow>
                  </AutoColumn>
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.OUTPUT]}
                    onUserInput={handleTypeOutput}
                    label={independentField === Field.INPUT && !showWrap && trade ? "To (estimated)" : "To"}
                    showMaxButton={false}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                    id="swap-currency-output"
                  />
                  {showWrap ? null : (
                    <AutoColumn gap="7px" style={{ padding: "0 16px" }}>
                      <Row>
                        {Boolean(trade) && (
                          <Fragment>
                            <p>Price</p>
                            {isLoading ? (
                              <Skeleton className="ml-2" />
                            ) : (
                              <TradePrice
                                price={trade?.executionPrice}
                                showInverted={showInverted}
                                setShowInverted={setShowInverted}
                              />
                            )}
                          </Fragment>
                        )}
                      </Row>
                      <Row className="justify-between">
                        <p className="text-xs font-bold text-blue-600">Slippage Tolerance</p>
                        <p className="font-bold text-primary-600">{allowedSlippage / 100}%</p>
                      </Row>
                    </AutoColumn>
                  )}
                </div>
                <Box mt="0.25rem">
                  {swapIsUnsupported ? (
                    <Button width="100%" disabled>
                      {"Unsupported Asset"}
                    </Button>
                  ) : !account ? (
                    <ConnectWalletButton width="100%" />
                  ) : showWrap ? (
                    <Button width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
                      {wrapInputError ??
                        (wrapType === WrapType.WRAP ? "Wrap" : wrapType === WrapType.UNWRAP ? "Unwrap" : null)}
                    </Button>
                  ) : noRoute && userHasSpecifiedInputOutput ? (
                    <GreyCard style={{ textAlign: "center", padding: "0.75rem" }}>
                      <Text color="textSubtle">{"Insufficient liquidity for this trade."}</Text>
                      {singleHopOnly && <Text color="textSubtle">{"Try enabling multi-hop trades."}</Text>}
                    </GreyCard>
                  ) : showApproveFlow ? (
                    <RowBetween>
                      <Button
                        variant={approval === ApprovalState.APPROVED ? "success" : "primary"}
                        onClick={approveCallback}
                        disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                        width="48%"
                      >
                        {approval === ApprovalState.PENDING ? (
                          <AutoRow gap="6px" justify="center">
                            {"Enabling"} <CircleLoader stroke="white" />
                          </AutoRow>
                        ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
                          "Enabled"
                        ) : (
                          `Enable ${currencies[Field.INPUT]?.symbol ?? ""}`
                        )}
                      </Button>
                      <Button
                        variant={isValid && priceImpactSeverity > 2 ? "danger" : "primary"}
                        onClick={() => {
                          if (isExpertMode) {
                            handleSwap();
                          } else {
                            setSwapState({
                              tradeToConfirm: trade,
                              attemptingTxn: false,
                              swapErrorMessage: undefined,
                              txHash: undefined,
                            });
                            onPresentConfirmModal();
                          }
                        }}
                        width="48%"
                        id="swap-button"
                        disabled={
                          !isValid || approval !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)
                        }
                      >
                        {priceImpactSeverity > 3 && !isExpertMode
                          ? "Price Impact High"
                          : priceImpactSeverity > 2
                          ? "Swap Anyway"
                          : "Swap"}
                      </Button>
                    </RowBetween>
                  ) : (
                    <Button
                      variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? "danger" : "primary"}
                      onClick={() => {
                        if (isExpertMode) {
                          handleSwap();
                        } else {
                          setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            txHash: undefined,
                          });
                          onPresentConfirmModal();
                        }
                      }}
                      id="swap-button"
                      width="100%"
                      disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                    >
                      {swapInputError ||
                        (priceImpactSeverity > 3 && !isExpertMode
                          ? "Price Impact Too High"
                          : priceImpactSeverity > 2
                          ? "Swap Anyway"
                          : "Swap")}
                    </Button>
                  )}
                  {showApproveFlow && (
                    <Column style={{ marginTop: "1rem" }}>
                      <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
                    </Column>
                  )}
                  {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
                </Box>
              </div>
              {!swapIsUnsupported ? (
                trade && <AdvancedSwapDetailsDropdown trade={trade} />
              ) : (
                <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
