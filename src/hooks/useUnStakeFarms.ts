import { useCallback } from "react";
import { unstakeFarm, unstakeKrlPool2Farm } from "../utils/calls";
import { useKrlContract, useKrlPool2Contract } from "./useContract";

const useUnstakeFarms = (pid: number) => {
  const unstake = pid === 1 ? unstakeKrlPool2Farm : unstakeFarm;

  const krlContract = useKrlContract();
  const krlPool2Contract = useKrlPool2Contract();

  let contract = krlContract;
  if (pid === 1) {
    contract = krlPool2Contract;
  }

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstake(contract, amount);
    },
    [contract, unstake]
  );

  return { onUnstake: handleUnstake };
};

export default useUnstakeFarms;
