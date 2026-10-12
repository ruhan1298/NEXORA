import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Star, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockTokens as tokens } from '../data/tokens';
import { usePortfolioStore } from '../lib/store';
import { useWallet } from '../context/WalletContext';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('holdings');
  const { holdings, watchlist, toggleWatchlist, transactions } = usePortfolioStore();
  const { isConnected, balance } = useWallet();

  // Calculate portfolio value
  const portfolioValue = Object.entries(holdings).reduce((total, [symbol, amount]) => {
    const token = tokens.find(t => t.symbol === symbol);
    return total + (token ? token.price * amount : 0);
  }, 0);

  const totalValue = balance + portfolioValue;

  // Generate allocation data for pie chart
  const allocationData = Object.entries(holdings).map(([symbol, amount]) => {
    const token = tokens.find(t => t.symbol === symbol);
    return {
      name: symbol,
      value: token ? token.price * amount : 0,
      color: ['#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)],
    };
  });

  // Add ETH balance to allocation
  if (balance > 0) {
    allocationData.push({ name: 'ETH', value: balance, color: '#627EEA' });
  }

  // Generate balance history chart data
  const balanceHistory = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: totalValue * (1 + (Math.random() - 0.5) * 0.1),
  }));

  const watchedTokens = tokens.filter(t => watchlist.includes(t.symbol));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
        <p className="text-gray-400">Track your investments and performance</p>
      </div>

      {!isConnected ? (
        <div className="glass-card p-12 text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">Connect your wallet to view your portfolio and track your investments</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Total Balance</span>
                <Wallet className="w-5 h-5 text-blue" />
              </div>
              <div className="text-3xl font-bold">${totalValue.toFixed(2)}</div>
              <div className="flex items-center space-x-1 text-green text-sm mt-2">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">24h PnL</span>
                <TrendingUp className="w-5 h-5 text-green" />
              </div>
              <div className="text-3xl font-bold text-green">+$1,234.56</div>
              <div className="text-sm text-gray-400 mt-2">+3.2%</div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Total Assets</span>
                <Star className="w-5 h-5 text-purple" />
              </div>
              <div className="text-3xl font-bold">{Object.keys(holdings).length + 1}</div>
              <div className="text-sm text-gray-400 mt-2">tokens held</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allocation */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Portfolio Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {allocationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">${item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance History */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Balance Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={balanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#666" tick={{ fill: '#999' }} />
                    <YAxis stroke="#666" tick={{ fill: '#999' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass-card">
            <div className="flex space-x-2 border-b border-white/10 p-4">
              <button
                onClick={() => setActiveTab('holdings')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'holdings'
                    ? 'bg-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Holdings
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'watchlist'
                    ? 'bg-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Watchlist ({watchlist.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'bg-blue text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Transaction History
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'holdings' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                        <th className="pb-3">Token</th>
                        <th className="pb-3">Balance</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Value</th>
                        <th className="pb-3">24h Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue to-purple rounded-full flex items-center justify-center text-xs font-bold">
                              E
                            </div>
                            <div>
                              <div className="font-medium">Ethereum</div>
                              <div className="text-sm text-gray-400">ETH</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{balance.toFixed(4)}</td>
                        <td className="py-4">$3,500.00</td>
                        <td className="py-4 font-medium">${(balance * 3500).toFixed(2)}</td>
                        <td className="py-4 text-green">+2.5%</td>
                      </tr>
                      {Object.entries(holdings).map(([symbol, amount]) => {
                        const token = tokens.find(t => t.symbol === symbol);
                        if (!token || amount <= 0) return null;
                        return (
                          <tr key={symbol} className="border-b border-white/10">
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue to-purple rounded-full flex items-center justify-center text-xs font-bold">
                                  {symbol[0]}
                                </div>
                                <div>
                                  <div className="font-medium">{token.name}</div>
                                  <div className="text-sm text-gray-400">{symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4">{amount.toFixed(4)}</td>
                            <td className="py-4">${token.price.toFixed(4)}</td>
                            <td className="py-4 font-medium">${(token.price * amount).toFixed(2)}</td>
                            <td className={`py-4 ${token.change24h >= 0 ? 'text-green' : 'text-red'}`}>
                              {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {Object.keys(holdings).length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      No holdings yet. Start trading to build your portfolio.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'watchlist' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                        <th className="pb-3"></th>
                        <th className="pb-3">Token</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">24h Change</th>
                        <th className="pb-3">Market Cap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchedTokens.map((token) => (
                        <tr key={token.id} className="border-b border-white/10">
                          <td className="py-4">
                            <button
                              onClick={() => toggleWatchlist(token.symbol)}
                              className="text-yellow hover:text-yellow/80 transition-colors"
                            >
                              <Star className="w-5 h-5 fill-current" />
                            </button>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue to-purple rounded-full flex items-center justify-center text-xs font-bold">
                                {token.symbol[0]}
                              </div>
                              <div>
                                <div className="font-medium">{token.name}</div>
                                <div className="text-sm text-gray-400">{token.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">${token.price.toFixed(4)}</td>
                          <td className={`py-4 ${token.change24h >= 0 ? 'text-green' : 'text-red'}`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                          </td>
                          <td className="py-4 text-gray-400">${(token.marketCap / 1000000).toFixed(2)}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {watchedTokens.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      Your watchlist is empty. Add tokens to track them.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Token</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-white/10">
                          <td className="py-4">
                            <span className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                              tx.type === 'buy' ? 'bg-green/20 text-green' : 'bg-red/20 text-red'
                            }`}>
                              {tx.type === 'buy' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              <span className="uppercase">{tx.type}</span>
                            </span>
                          </td>
                          <td className="py-4">{tx.symbol}</td>
                          <td className="py-4">{tx.amount.toFixed(4)}</td>
                          <td className="py-4">${tx.price.toFixed(4)}</td>
                          <td className="py-4 font-medium">${(tx.amount * tx.price).toFixed(2)}</td>
                          <td className="py-4 text-gray-400">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {transactions.length === 0 && (
                    <div className="p-8 text-center text-gray-400">
                      No transaction history yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;
