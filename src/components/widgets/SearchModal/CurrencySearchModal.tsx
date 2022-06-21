import { TokenList } from "@uniswap/token-lists";
import React, { useCallback, useState } from "react";
import { Currency } from "../../../config/entities/currency";
import { Token } from "../../../config/entities/token";
import Button from "../../Buttons/Button";
import { InjectedModalProps } from "../../Modal";
import Modal, { ModalBackButton, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "../../Modal/Modal";
import ImportToken from "./importToken";
import CurrencyModalView from "./types";
import usePrevious from "../../../hooks/usePreviousValue";
import ImportList from "./ImportList";

interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherSelectedCurrency?: Currency | null;
  showCommonBases?: boolean;
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss?.();
      onCurrencySelect(currency);
    },
    [onDismiss, onCurrencySelect],
  );

  // for token import view
  const prevView = usePrevious(modalView);

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>();

  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>();
  const [listURL, setListUrl] = useState<string | undefined>();

  const config = {
    [CurrencyModalView.search]: { title: "Select a Token", onBack: undefined },
    [CurrencyModalView.manage]: { title: "Manage", onBack: () => setModalView(CurrencyModalView.search) },
    [CurrencyModalView.importToken]: {
      title: "Import Tokens",
      onBack: () =>
        setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search),
    },
    [CurrencyModalView.importList]: { title: "Import List", onBack: () => setModalView(CurrencyModalView.search) },
  };

  return (
    <ModalContainer className="max-w-md w-full">
      <ModalHeader>
        <ModalTitle>
          {config[modalView].onBack && <ModalBackButton onBack={config[modalView].onBack} />}
          <h2>{config[modalView].title}</h2>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <div className="p-6 overflow-y-auto">
        {modalView === CurrencyModalView.search ? (
          <CurrencySearch
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            setImportToken={setImportToken}
          />
        ) : modalView === CurrencyModalView.importToken && importToken ? (
          <ImportToken tokens={[importToken]} handleCurrencySelect={handleCurrencySelect} />
        ) : modalView === CurrencyModalView.importList && importList && listURL ? (
          <ImportList list={importList} listURL={listURL} onImport={() => setModalView(CurrencyModalView.manage)} />
        ) : modalView === CurrencyModalView.manage ? (
          <Manage
            setModalView={setModalView}
            setImportToken={setImportToken}
            setImportList={setImportList}
            setListUrl={setListUrl}
          />
        ) : (
          ""
        )}
        {modalView === CurrencyModalView.search && (
          <div className="w-full text-center">
            <Button onClick={() => setModalView(CurrencyModalView.manage)} className="list-token-manage-button">
              Manage Tokens
            </Button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}
