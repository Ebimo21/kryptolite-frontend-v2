import { useCallback } from "react";
import { ethers, Contract } from "ethers";
import { useCallWithGasPrice } from "../hooks/useCallWithGasPrice";

const useApproveFarm = (lpContract: Contract, spenderContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice();
  const handleApprove = useCallback(async () => {
    // console.log(masterChefContract);
    // debugger;
    const tx = await callWithGasPrice(lpContract, "approve", [
      spenderContract.address,
      ethers.constants.MaxUint256,
    ]);
    const receipt = await tx.wait();
    return receipt.status;
  }, [lpContract, spenderContract, callWithGasPrice]);

  return { onApprove: handleApprove };
};

export default useApproveFarm;
