import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import {
  getBep20Contract,
  getContract,
  getKrlContract,
  getKrlPool2Contract,
  getMulticallContract,
  getProviderOrSigner,
} from "../utils/contractHelpers";
import { Contract } from "ethers";
import { ERC20_ABI, ERC20_BYTES32_ABI } from "../config/abi/erc20";
import WETH_ABI from "../config/abi/weth.json";
import { WETH } from "../config/entities/token";

// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { library, account } = useActiveWeb3React();
  const signer = useMemo(
    // @ts-ignore
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  );

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? library : true),
    [address, ABI, library, withSignerIfPossible],
  );

  return useMemo(() => {
    if (!canReturnContract) return null;
    try {
      //@ts-ignore
      return getContract(address, ABI, signer);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, signer, canReturnContract]) as T;
}

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getBep20Contract(address, library?.getSigner()), [address, library]);
};

export const useKrlContract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getKrlContract(library?.getSigner()), [library]);
};

export const useKrlPool2Contract = () => {
  const { library } = useActiveWeb3React();
  return useMemo(() => getKrlPool2Contract(library?.getSigner()), [library]);
};

export function useMulticallContract() {
  const { library } = useActiveWeb3React();
  return useMemo(() => getMulticallContract(library?.getSigner()), [library]);
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useWBNBContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible);
}
