import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioStore {
  watchlist: string[];
  toggleWatchlist: (symbol: string) => void;
  holdings: Record<string, number>;
  addHolding: (symbol: string, amount: number) => void;
  transactions: Array<{
    id: string;
    type: 'buy' | 'sell';
    symbol: string;
    amount: number;
    price: number;
    timestamp: Date;
  }>;
  addTransaction: (transaction: {
    type: 'buy' | 'sell';
    symbol: string;
    amount: number;
    price: number;
  }) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      watchlist: [],
      toggleWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.includes(symbol)
            ? state.watchlist.filter((s) => s !== symbol)
            : [...state.watchlist, symbol],
        })),
      holdings: {},
      addHolding: (symbol, amount) =>
        set((state) => ({
          holdings: {
            ...state.holdings,
            [symbol]: (state.holdings[symbol] || 0) + amount,
          },
        })),
      transactions: [],
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date(),
            },
            ...state.transactions,
          ],
        })),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);
