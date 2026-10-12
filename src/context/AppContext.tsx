import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletState, Token } from '../types';

interface AppContextType {
  wallet: WalletState;
  connectWallet: (provider: 'metamask' | 'walletconnect' | 'demo') => void;
  disconnectWallet: () => void;
  watchlist: string[];
  addToWatchlist: (tokenId: string) => void;
  removeFromWatchlist: (tokenId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: '',
    balance: 0,
    provider: null,
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const connectWallet = (provider: 'metamask' | 'walletconnect' | 'demo') => {
    const demoAddress = '0x' + Math.random().toString(16).substr(2, 40);
    setWallet({
      connected: true,
      address: demoAddress,
      balance: Math.random() * 10,
      provider,
    });
  };

  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: '',
      balance: 0,
      provider: null,
    });
  };

  const addToWatchlist = (tokenId: string) => {
    setWatchlist((prev) => [...prev, tokenId]);
  };

  const removeFromWatchlist = (tokenId: string) => {
    setWatchlist((prev) => prev.filter((id) => id !== tokenId));
  };

  return (
    <AppContext.Provider
      value={{
        wallet,
        connectWallet,
        disconnectWallet,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
