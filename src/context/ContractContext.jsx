// src/context/ContractContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { contracts } from '../config/contracts';

const ContractContext = createContext();

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContracts must be used within a ContractProvider');
  }
  return context;
};

export const ContractProvider = ({ children }) => {
  const { address, chainId } = useAccount();
  const [counter, setCounter] = useState(0);
  const [userData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get contract addresses for current chain
  const chainContracts = contracts[chainId] || contracts[84532]; // fallback to base sepolia

  // Read counter value
  const { data: counterData, refetch: refetchCounter } = useReadContract({
    address: chainContracts?.core?.address,
    abi: chainContracts?.core?.abi,
    functionName: 'count',
  });

  // Read user data
  const { data: userDataRaw, refetch: refetchUserData } = useReadContract({
    address: chainContracts?.core?.address,
    abi: chainContracts?.core?.abi,
    functionName: 'getUserData',
    args: [address],
  });

  // Write contract functions
  const { writeContractAsync } = useWriteContract();

  // Update counter when data changes
  useEffect(() => {
    if (counterData !== undefined) {
      setCounter(Number(counterData));
    }
  }, [counterData]);

  // Update user data when data changes
  useEffect(() => {
    if (userDataRaw) {
      setUserData({
        totalActions: Number(userDataRaw[0]),
        increments: Number(userDataRaw[1]),
        decrements: Number(userDataRaw[2]),
        lastActionDay: Number(userDataRaw[3]),
        currentStreak: Number(userDataRaw[4]),
        longestStreak: Number(userDataRaw[5]),
      });
    }
  }, [userDataRaw]);

  // Mock leaderboard data
  useEffect(() => {
    setLeaderboard([
      { address: '0x1234...5678', score: 1250 },
      { address: '0xabcd...ef01', score: 980 },
      { address: '0x2468...1357', score: 750 },
      { address: '0x1357...2468', score: 620 },
      { address: '0x9876...5432', score: 510 },
    ]);
  }, []);

  const increment = async () => {
    if (!address || !chainContracts?.core?.address) return;
    
    setLoading(true);
    try {
      const hash = await writeContractAsync({
        address: chainContracts.core.address,
        abi: chainContracts.core.abi,
        functionName: 'increment',
        args: ['0x0000000000000000000000000000000000000000'], // referrer
        value: 1000000000000000n, // 0.001 ETH fee
      });
      await refetchCounter();
      await refetchUserData();
      return hash;
    } catch (error) {
      console.error('Increment error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const decrement = async () => {
    if (!address || !chainContracts?.core?.address) return;
    
    setLoading(true);
    try {
      const hash = await writeContractAsync({
        address: chainContracts.core.address,
        abi: chainContracts.core.abi,
        functionName: 'decrement',
        args: ['0x0000000000000000000000000000000000000000'], // referrer
        value: 1000000000000000n, // 0.001 ETH fee
      });
      await refetchCounter();
      await refetchUserData();
      return hash;
    } catch (error) {
      console.error('Decrement error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        counter,
        userData,
        leaderboard,
        loading,
        increment,
        decrement,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};