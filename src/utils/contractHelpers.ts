import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { getKrlAddress, getKrlPool2Address, getMulticallAddress, getPizzaDayAddress } from "./addressHelpers";
import bep20Abi from "../config/abi/erc20.json";
import MultiCallAbi from "../config/abi/Multicall.json";
import krl from "../config/abi/krlReward.json";
import krlPool2 from "../config/abi/krlPool2.json";
import pizzaDay from "../config/abi/pizzaDay.json";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { simpleRpcProvider } from "./providers";

// account is optional
export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new Contract(address, abi, signerOrProvider);
};

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(bep20Abi, address, signer);
};

export const getKrlContract = (signer?: Signer | Provider) => {
  return getContract(krl, getKrlAddress(), signer);
};

export const getKrlPool2Contract = (signer?: Signer | Provider) => {
  return getContract(krlPool2, getKrlPool2Address(), signer);
};

export const getMulticallContract = (signer?: Signer | Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer);
};

export const getPizzaDayContract = (signer?: Signer | Provider) => getContract(pizzaDay, getPizzaDayAddress(), signer);
