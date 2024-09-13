import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Text, VStack, Spinner } from '@chakra-ui/react';

interface BalanceDisplayProps {
  address: string | null;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ address }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [address]);

  const fetchBalance = async () => {
    if (typeof window.ethereum !== 'undefined' && address) {
      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!address) {
    return null;
  }

  return (
    <VStack spacing={2} align="stretch">
      <Text fontWeight="bold">Balance:</Text>
      {loading ? (
        <Spinner size="sm" />
      ) : balance ? (
        <Text>{balance} ETH</Text>
      ) : (
        <Text>Unable to fetch balance</Text>
      )}
    </VStack>
  );
};

export default BalanceDisplay;