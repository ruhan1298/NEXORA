import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTokens } from '../data/mockData';

const Trading: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState(mockTokens[0]);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [balance] = useState(5.5);

  const chartData = [
    { time: '00:00', price: selectedToken.price * 0.95 },
    { time: '04:00', price: selectedToken.price * 0.97 },
    { time: '08:00', price: selectedToken.price * 0.94 },
    { time: '12:00', price: selectedToken.price * 1.02 },
    { time: '16:00', price: selectedToken.price * 1.05 },
    { time: '20:00', price: selectedToken.price * 1.03 },
    { time: '24:00', price: selectedToken.price },
  ];

  const recentTrades = [
    { id: 1, type: 'buy', token: 'NEXO', amount: 50, price: 2.45, total: 122.50, time: '10:30 AM' },
    { id: 2, type: 'sell', token: 'CFLOW', amount: 100, price: 0.85, total: 85.00, time: '09:15 AM' },
    { id: 3, type: 'buy', token: 'DYLD', amount: 75, price: 1.23, total: 92.25, time: '08:45 AM' },
  ];

  const handleTrade = () => {
    alert(`${tradeType.toUpperCase()} order placed for ${amount} ${selectedToken.symbol} (Demo)`);
    setAmount('');
  };

  const estimatedTotal = parseFloat(amount) * selectedToken.price;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">DEMO TRADING TERMINAL</h1>
          <p className="text-gray-400">Simulated trading with fictional data - Not real transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Token Selection */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-electric-purple rounded-lg flex items-center justify-center text-2xl">
                    {selectedToken.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedToken.name}</h2>
                    <p className="text-electric-blue">{selectedToken.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">${selectedToken.price.toFixed(2)}</div>
                  <div className={`flex items-center justify-end space-x-1 ${
                    selectedToken.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedToken.change24h >= 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                    <span>{selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h.toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <select
                value={selectedToken.id}
                onChange={(e) => setSelectedToken(mockTokens.find(t => t.id === e.target.value) || mockTokens[0])}
                className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
              >
                {mockTokens.map((token) => (
                  <option key={token.id} value={token.id}>
                    {token.name} ({token.symbol}) - ${token.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Chart */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Price Chart</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f1423', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#00d4ff"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Trades</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Type</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-medium">Token</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-medium">Amount</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-medium">Price</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-medium">Total</th>
                      <th className="text-right px-4 py-3 text-gray-400 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-white/5">
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            trade.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {trade.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white">{trade.token}</td>
                        <td className="px-4 py-3 text-right text-white">{trade.amount}</td>
                        <td className="px-4 py-3 text-right text-gray-300">${trade.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-electric-blue font-medium">${trade.total.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-gray-400">{trade.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Balance */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Balance</span>
                </h3>
                <span className="text-2xl font-bold text-electric-blue">{balance.toFixed(4)} ETH</span>
              </div>
              <p className="text-sm text-gray-400">Demo balance - Not real funds</p>
            </div>

            {/* Trade Panel */}
            <div className="glass-card p-6">
              <div className="flex mb-6">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-3 font-semibold transition-colors ${
                    tradeType === 'buy'
                      ? 'bg-green-500 text-white'
                      : 'bg-navy-900 text-gray-400 hover:text-white'
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-3 font-semibold transition-colors ${
                    tradeType === 'sell'
                      ? 'bg-red-500 text-white'
                      : 'bg-navy-900 text-gray-400 hover:text-white'
                  }`}
                >
                  SELL
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount ({selectedToken.symbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                  <div className="bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white">
                    ${selectedToken.price.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Total</label>
                  <div className="bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-electric-blue font-semibold">
                    ${estimatedTotal.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={handleTrade}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    tradeType === 'buy'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                  } text-white`}
                >
                  {tradeType === 'buy' ? (
                    <span className="flex items-center justify-center space-x-2">
                      <ArrowUpRight className="w-5 h-5" />
                      <span>BUY {selectedToken.symbol}</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-2">
                      <ArrowDownRight className="w-5 h-5" />
                      <span>SELL {selectedToken.symbol}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Order Info */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white">{tradeType.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Token</span>
                  <span className="text-white">{selectedToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="text-white">${selectedToken.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-gray-400">Total</span>
                  <span className="text-electric-blue font-semibold">${estimatedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ DEMO TRADING - All trades are simulated with fictional data. No real transactions or funds are involved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trading;
