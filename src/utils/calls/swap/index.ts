export function useUserSlippageTolerance(): [number, (slippage: number) => void] {
  return [0.1, () => {}];
}
