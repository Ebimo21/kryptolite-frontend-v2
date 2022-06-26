import useSWRImmutable from "swr/immutable";

export const useCurrentBlock = (): number => {
  const { data: currentBlock = 0 } = useSWRImmutable("blockNumber");
  return currentBlock;
};
