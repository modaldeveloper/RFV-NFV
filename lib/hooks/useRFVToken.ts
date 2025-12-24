"use client";

import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import RFVTokenABI from '../contracts/abis/RFVToken.json';
import { CONTRACT_ADDRESSES } from '../contracts/config';
import { useToast } from '@/hooks/use-toast';

export function useRFVToken() {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getBalance = useCallback(async (address: string) => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.RFVToken,
        RFVTokenABI.abi,
        provider
      );
      
      const balance = await contract.balanceOf(address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch RFV balance",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    balance,
    loading,
    getBalance
  };
}