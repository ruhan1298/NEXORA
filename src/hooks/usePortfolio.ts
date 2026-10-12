import { useLocalStorage } from './useLocalStorage';

export interface PortfolioAsset {
  symbol: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useLocalStorage<PortfolioAsset[]>('nexora-portfolio', []);

  const addAsset = (symbol: string, amount: number, price: number) => {
    const existingAsset = portfolio.find((a) => a.symbol === symbol);

    if (existingAsset) {
      const totalAmount = existingAsset.amount + amount;
      const averagePrice = (existingAsset.averagePrice * existingAsset.amount + price * amount) / totalAmount;
      setPortfolio(
        portfolio.map((a) =>
          a.symbol === symbol
            ? { ...a, amount: totalAmount, averagePrice, currentPrice: price }
            : a
        )
      );
    } else {
      setPortfolio([...portfolio, { symbol, amount, averagePrice: price, currentPrice: price }]);
    }
  };

  const removeAsset = (symbol: string) => {
    setPortfolio(portfolio.filter((a) => a.symbol !== symbol));
  };

  const updatePrice = (symbol: string, price: number) => {
    setPortfolio(portfolio.map((a) => (a.symbol === symbol ? { ...a, currentPrice: price } : a)));
  };

  const getTotalValue = () => {
    return portfolio.reduce((total, asset) => total + asset.amount * asset.currentPrice, 0);
  };

  const getTotalPnL = () => {
    return portfolio.reduce(
      (total, asset) => total + (asset.currentPrice - asset.averagePrice) * asset.amount,
      0
    );
  };

  return {
    portfolio,
    addAsset,
    removeAsset,
    updatePrice,
    getTotalValue,
    getTotalPnL,
  };
}
