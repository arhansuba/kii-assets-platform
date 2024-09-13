import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button, Text, VStack } from '@chakra-ui/react';

const WalletConnect: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setIsConnected(true);
        setAddress(address);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <VStack spacing={4} align="stretch">
      {isConnected ? (
        <>
          <Text>Connected: {address}</Text>
          <Button colorScheme="red" onClick={disconnectWallet}>Disconnect Wallet</Button>
        </>
      ) : (
        <Button colorScheme="blue" onClick={connectWallet}>Connect Wallet</Button>
      )}
    </VStack>
  );
};

export default WalletConnect;