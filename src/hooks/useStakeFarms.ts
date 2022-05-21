import { useCallback } from "react";
import { stakeFarm, stakeKrlPool2Farm } from "../utils/calls";
import { useKrlContract, useKrlPool2Contract } from "./useContract";

const useStakeFarms = (pid: number) => {
  const stake = pid === 1 ? stakeKrlPool2Farm : stakeFarm;
  const krlContract = useKrlContract();
  const krlPool2Contract = useKrlPool2Contract();

  let contract = krlContract;
  if (pid === 1) {
    contract = krlPool2Contract;
  }

  const handleStake = useCallback(
    async (amount: string) => {
      await stake(contract, amount);
    },
    [contract, stake]
  );

  return { onStake: handleStake };
};

export default useStakeFarms;
