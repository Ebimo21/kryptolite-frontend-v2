import React, { useCallback, useMemo, useRef } from "react";
import { useFarms, usePollFarmsWithUserData, usePriceCakeBusd } from "../../state/farms/hooks";
import BigNumber from "bignumber.js";
import { DeserializedFarm } from "../../state/types";
import { getFarmAprV3, getKrlPool2Apr } from "../../utils/apr";
import { useWeb3React } from "@web3-react/core";
import { getFullDisplayBalance } from "../../utils/formatBalance";
import FarmCard, { FarmWithStakedValue } from "../FarmCard/FarmCard";

const getDisplayApr = (cakeRewardsApr?: number) => {
  if (cakeRewardsApr) {
    return `${cakeRewardsApr.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })}%`;
  }
  return null;
};

export default function StakingPanel() {
  const chosenFarmsLength = useRef(0);

  const { account } = useWeb3React();
  const { data: farmsLP } = useFarms();
  const cakePrice = usePriceCakeBusd();

  usePollFarmsWithUserData();

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== "0X");

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceBusd) {
          return farm;
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceBusd);
        const rfd = farm.extras.rewardForDuration;
        const rd = farm.extras.rewardsDuration;

        // Apr calc for pool2
        const totalTokenStaked = farm.extras.totalTokenStaked;
        const rewardPerBlock = farm.extras.rewardPerBlock;
        const lpPriceBusd = totalLiquidity.div(totalTokenStaked);

        const { cakeRewardsApr } = (() =>
          farm.pid === 1
            ? getKrlPool2Apr(totalTokenStaked, rewardPerBlock, lpPriceBusd, cakePrice)
            : getFarmAprV3(cakePrice, totalLiquidity, rfd, rd))();

        return {
          ...farm,
          apr: farm.ended ? 0 : cakeRewardsApr,
          liquidity: totalLiquidity,
        };
      });

      return farmsToDisplayWithAPR;
    },
    [cakePrice],
  );

  const chosenFarmsMemoized = useMemo(() => {
    return farmsList(activeFarms);
  }, [activeFarms, farmsList]);

  chosenFarmsLength.current = chosenFarmsMemoized.length;

  const krlBalance = useMemo(
    () =>
      getFullDisplayBalance(
        account ? farmsLP[0].userData?.tokenBalance || new BigNumber(0) : new BigNumber(0),
        undefined,
        3,
      ),
    [account, farmsLP],
  );

  return (
    <div>
      <div className="flex justify-between max-w-6xl mx-auto items-center text-primary-700">
        <div className="text-2xl inline-block bg-dark-light">
          {krlBalance} <span className="text-lg font-bold">KRL-BUSD LP</span>
        </div>
      </div>
      <div className="py-8 space-y-8">
        {chosenFarmsMemoized.map((farm) => (
          <FarmCard
            key={farm.pid}
            farm={farm}
            displayApr={getDisplayApr(farm.apr)}
            cakePrice={cakePrice}
            account={account as any}
            removed={farm.ended}
          />
        ))}
      </div>
    </div>
  );
}
