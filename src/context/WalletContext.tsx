import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  wallet: {
    connected: boolean;
    address: string | null;
    balance: number;
  };
  connectWallet: (provider: string) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState({
    connected: false,
    address: null as string | null,
    balance: 0,
  });

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedBalance = localStorage.getItem('walletBalance');
    if (savedAddress) {
      setWallet({
        connected: true,
        address: savedAddress,
        balance: savedBalance ? parseFloat(savedBalance) : 0,
      });
    }
  }, []);

  const connectWallet = async (provider: string) => {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const fakeAddress = '0x7a3F' + Math.random().toString(16).substr(2, 8) + 'c91E';
    const fakeBalance = 2.5 + Math.random() * 5;

    setWallet({
      connected: true,
      address: fakeAddress,
      balance: fakeBalance,
    });

    localStorage.setItem('walletAddress', fakeAddress);
    localStorage.setItem('walletBalance', fakeBalance.toString());
  };

  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: null,
      balance: 0,
    });
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletBalance');
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
