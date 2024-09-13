import { ethers } from 'ethers';

let provider: ethers.providers.Provider;
let signer: ethers.Signer;

export const initializeWeb3 = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      return true;
    } catch (error) {
      console.error('User denied account access');
      return false;
    }
  } else {
    console.log('Please install MetaMask!');
    return false;
  }
};

export const getAddress = async (): Promise<string> => {
  if (!signer) {
    throw new Error('Web3 not initialized');
  }
  return await signer.getAddress();
};

export const signMessage = async (message: string): Promise<string> => {
  if (!signer) {
    throw new Error('Web3 not initialized');
  }
  return await signer.signMessage(message);
};

export const sendTransaction = async (to: string, value: string): Promise<ethers.providers.TransactionResponse> => {
  if (!signer) {
    throw new Error('Web3 not initialized');
  }
  return await signer.sendTransaction({
    to,
    value: ethers.utils.parseEther(value)
  });
};