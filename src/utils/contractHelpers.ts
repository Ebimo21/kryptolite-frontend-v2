import { ethers } from "ethers";
import {
  getKrlAddress,
  getKrlPool2Address,
  getMulticallAddress,
} from "./addressHelpers";
// ABI
import bep20Abi from "../config/abi/erc20.json";
import MultiCallAbi from "../config/abi/Multicall.json";
import krl from "../config/abi/krlReward.json";
import krlPool2 from "../config/abi/krlPool2.json";
import { simpleRpcProvider } from "./providers";

export const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider | undefined
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getBep20Contract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(bep20Abi, address, signer);
};

export const getKrlContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(krl, getKrlAddress(), signer);
};

export const getKrlPool2Contract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(krlPool2, getKrlPool2Address(), signer);
};

export const getMulticallContract = (
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer);
};
