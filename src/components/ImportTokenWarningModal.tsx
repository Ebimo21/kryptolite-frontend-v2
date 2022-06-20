import React from "react";
import { Token } from "../config/entities/token";
import { InjectedModalProps, Modal } from "./Modal";
import ImportToken from "./widgets/SearchModal/importToken";

interface Props extends InjectedModalProps {
  tokens: Token[];
  onCancel: () => void;
}

const ImportTokenWarningModal: React.FC<Props> = ({ tokens, onDismiss, onCancel }) => {
  return (
    <Modal
      title="Import Token"
      onDismiss={() => {
        onDismiss?.();
        onCancel();
      }}
      style={{ maxWidth: "420px" }}
    >
      <ImportToken tokens={tokens} handleCurrencySelect={onDismiss} />
    </Modal>
  );
};

export default ImportTokenWarningModal;
