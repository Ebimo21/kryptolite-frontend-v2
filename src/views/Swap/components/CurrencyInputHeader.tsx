import React from "react";
import Button from "../../../components/Buttons/Button";
import RefreshIcon from "../../../components/Svg/Icons/Refresh";

interface Props {
  title: string;
  subtitle: string;
  noConfig?: boolean;
  isChartDisplayed?: boolean;
  hasAmount: boolean;
  onRefreshPrice: () => void;
}

const CurrencyInputHeader: React.FC<Props> = ({ title, subtitle, hasAmount, onRefreshPrice }) => {
  return (
    <div className="flex flex-col items-center p-6 w-full border-b">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-end w-full mr-4">
          <h2>{title}</h2>
        </div>
        <div>
          {/* <IconButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
            <HistoryIcon color="textSubtle" width="24px" />
          </IconButton> */}
          <Button onClick={() => onRefreshPrice()} disabled={!hasAmount}>
            <RefreshIcon color="textSubtle" width="27px" />
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default CurrencyInputHeader;
