import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider & {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

export {};
