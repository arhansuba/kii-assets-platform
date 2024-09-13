import { ethers } from 'ethers';

export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: string, decimals: number = 18): string => {
  return ethers.utils.formatUnits(balance, decimals);
};

export const parseAmount = (amount: string, decimals: number = 18): string => {
  return ethers.utils.parseUnits(amount, decimals).toString();
};

export const isValidAddress = (address: string): boolean => {
  return ethers.utils.isAddress(address);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: unknown;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await sleep(delay);
    }
  }
  throw lastError;
};

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise((resolve) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
};