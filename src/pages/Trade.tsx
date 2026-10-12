import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, Wallet, History } from 'lucide-react';
import { mockTokens as tokens } from '../data/tokens';
import { usePortfolioStore } from '../lib/store';
import { useWallet } from '../context/WalletContext';

const Trade: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [price, setPrice] = useState(selectedToken.price);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [openOrders, setOpenOrders] = useState<any[]>([]);
  const { isConnected } = useWallet();
  const { addTransaction, addHolding } = usePortfolioStore();

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const change = (Math.random() - 0.5) * 0.01;
        const newPrice = prev * (1 + change);
        return newPrice;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedToken]);

  // Update chart data
  useEffect(() => {
    const data = [];
    let currentPrice = selectedToken.price;
    for (let i = 0; i < 50; i++) {
      data.push({
        time: i,
        price: currentPrice,
      });
      currentPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
    }
    setChartData(data);
  }, [selectedToken]);

  // Generate mock order book
  useEffect(() => {
    const bids = [];
    const asks = [];
    for (let i = 0; i < 8; i++) {
      bids.push({
        price: (price * (1 - i * 0.001)).toFixed(4),
        amount: (Math.random() * 10).toFixed(2),
        total: (Math.random() * 50).toFixed(2),
      });
      asks.push({
        price: (price * (1 + i * 0.001)).toFixed(4),
        amount: (Math.random() * 10).toFixed(2),
        total: (Math.random() * 50).toFixed(2),
      });
    }
    setOrderBook({ bids, asks });
  }, [price]);

  // Generate mock recent trades
  useEffect(() => {
    const trades = [];
    for (let i = 0; i < 10; i++) {
      trades.push({
        price: (price * (1 + (Math.random() - 0.5) * 0.005)).toFixed(4),
        amount: (Math.random() * 5).toFixed(2),
        time: Date.now() - i * 30000,
        type: Math.random() > 0.5 ? 'buy' : 'sell',
      });
    }
    setRecentTrades(trades);
  }, [price]);

  const handleSliderChange = (percent: number) => {
    if (isConnected) {
      const maxAmount = 12.5 / price;
      setAmount((maxAmount * percent).toFixed(4));
    }
  };

  const handleSubmitOrder = () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    const orderAmount = parseFloat(amount);
    if (!orderAmount || orderAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const orderPrice = orderType === 'market' ? price : parseFloat(limitPrice);
    const total = orderAmount * orderPrice;

    // Add transaction
    addTransaction({
      type: side,
      symbol: selectedToken.symbol,
      amount: orderAmount,
      price: orderPrice,
    });

    // Update holdings
    if (side === 'buy') {
      addHolding(selectedToken.symbol, orderAmount);
    } else {
      addHolding(selectedToken.symbol, -orderAmount);
    }

    // Add to open orders
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      type: side,
      orderType,
      token: selectedToken.symbol,
      amount: orderAmount,
      price: orderType === 'limit' ? orderPrice : undefined,
      status: 'open',
      timestamp: new Date(),
    };
    setOpenOrders([newOrder, ...openOrders]);

    setAmount('');
    setLimitPrice('');
    alert(`${side === 'buy' ? 'Buy' : 'Sell'} order placed successfully!`);
  };

  const estimatedTotal = parseFloat(amount) * (orderType === 'market' ? price : parseFloat(limitPrice) || price);
  const fee = estimatedTotal * 0.001; // 0.1% fee

  return (
    <div className="space-y-6">
      {/* Simulation Banner */}
      <div className="bg-yellow/10 border border-yellow/30 rounded-lg p-4 flex items-center space-x-3">
        <span className="text-yellow">⚠️</span>
        <span className="text-yellow font-medium">Simulation only - no real transactions</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Trading Terminal</h1>
          <p className="text-gray-400">Trade tokens with real-time market data</p>
        </div>
        <select
          value={selectedToken.symbol}
          onChange={(e) => {
            const token = tokens.find(t => t.symbol === e.target.value);
            if (token) {
              setSelectedToken(token);
              setPrice(token.price);
            }
          }}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-blue/50"
        >
          {tokens.map(token => (
            <option key={token.symbol} value={token.symbol} className="bg-card">
              {token.name} ({token.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold">${price.toFixed(4)}</div>
              <div className={`flex items-center space-x-1 ${selectedToken.change24h >= 0 ? 'text-green' : 'text-red'}`}>
                {selectedToken.change24h >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h.toFixed(2)}%</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {selectedToken.name} / USDT
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#666" tick={{ fill: '#999' }} />
                <YAxis stroke="#666" tick={{ fill: '#999' }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Book */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Order Book</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-400 mb-2">Asks</div>
              {orderBook.asks.map((ask: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5">
                  <span className="text-red">{ask.price}</span>
                  <span className="text-gray-400">{ask.amount}</span>
                  <span className="text-gray-400">{ask.total}</span>
                </div>
              ))}
            </div>
            <div className="text-center py-2 border-y border-white/10">
              <span className="text-lg font-bold">${price.toFixed(4)}</span>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-2">Bids</div>
              {orderBook.bids.map((bid: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-1 border-b border-white/5">
                  <span className="text-green">{bid.price}</span>
                  <span className="text-gray-400">{bid.amount}</span>
                  <span className="text-gray-400">{bid.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trades */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Recent Trades</h3>
          <div className="space-y-2">
            {recentTrades.map((trade, i) => (
              <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5">
                <span className={trade.type === 'buy' ? 'text-green' : 'text-red'}>{trade.price}</span>
                <span className="text-gray-400">{trade.amount}</span>
                <span className="text-gray-400">
                  {new Date(trade.time).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Buy/Sell Panel */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setSide('buy')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                side === 'buy' ? 'bg-green text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setSide('sell')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                side === 'sell' ? 'bg-red text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Sell
            </button>
          </div>

          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setOrderType('market')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                orderType === 'market' ? 'bg-blue text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Market
            </button>
            <button
              onClick={() => setOrderType('limit')}
              className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                orderType === 'limit' ? 'bg-blue text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Limit
            </button>
          </div>

          {orderType === 'limit' && (
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Limit Price</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Amount ({selectedToken.symbol})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
            />
          </div>

          <div className="flex space-x-2 mb-6">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => handleSliderChange(percent / 100)}
                className="flex-1 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors"
              >
                {percent}%
              </button>
            ))}
          </div>

          <div className="space-y-2 mb-6 p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Estimated Total</span>
              <span>${estimatedTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee (0.1%)</span>
              <span>${fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-white/10">
              <span>Total</span>
              <span>${(estimatedTotal + fee).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmitOrder}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              side === 'buy' ? 'bg-green hover:bg-green/90' : 'bg-red hover:bg-red/90'
            }`}
          >
            {side === 'buy' ? 'Buy' : 'Sell'} {selectedToken.symbol}
          </button>

          {!isConnected && (
            <p className="text-center text-sm text-gray-400 mt-4">
              Connect wallet to trade
            </p>
          )}
        </div>
      </div>

      {/* Open Orders */}
      {openOrders.length > 0 && (
        <div className="glass-card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <History className="w-5 h-5" />
            <h3 className="font-semibold">Open Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Token</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {openOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/10">
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        order.type === 'buy' ? 'bg-green/20 text-green' : 'bg-red/20 text-red'
                      }`}>
                        {order.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3">{order.token}</td>
                    <td className="py-3">{order.amount}</td>
                    <td className="py-3">{order.price ? `$${order.price.toFixed(4)}` : 'Market'}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-blue/20 text-blue rounded text-xs">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;
