import { useCallback } from "react";
import { harvestFarm, harvestKrlPool2Farm } from "../utils/calls";
import { useKrlContract, useKrlPool2Contract } from "./useContract";

const useHarvestFarm = (pid: number) => {
  const krlContract = useKrlContract();
  const krlPool2Contract = useKrlPool2Contract();
  const harvest = pid === 1 ? harvestKrlPool2Farm : harvestFarm;

  let contract = krlContract;
  if (pid === 1) {
    contract = krlPool2Contract;
  }

  const handleHarvest = useCallback(async () => {
    await harvest(contract);
  }, [contract, harvest]);

  return { onReward: handleHarvest };
};

export default useHarvestFarm;
