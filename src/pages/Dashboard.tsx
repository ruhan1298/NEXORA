import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, TrendingUp, Star, Bell, Settings, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockTokens } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { wallet, watchlist } = useApp();

  const portfolioValue = 15890.50;
  const change24h = 12.5;

  const recentActivity = [
    { type: 'buy', token: 'NEXO', amount: 100, value: 245.00, time: '2 hours ago' },
    { type: 'sell', token: 'CFLOW', amount: 50, value: 42.50, time: '5 hours ago' },
    { type: 'buy', token: 'DYLD', amount: 75, value: 92.25, time: '1 day ago' },
  ];

  const watchlistTokens = mockTokens.filter((token) => watchlist.includes(token.id));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">User Dashboard</h1>
            <p className="text-gray-400">Manage your portfolio and track your activity</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 glass-card rounded-lg hover:glow-border transition-all">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 glass-card rounded-lg hover:glow-border transition-all">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Portfolio Value</h2>
              <Wallet className="w-6 h-6 text-electric-blue" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">${portfolioValue.toFixed(2)}</div>
            <div className={`flex items-center space-x-2 ${change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg">{change24h >= 0 ? '+' : ''}{change24h}%</span>
              <span className="text-gray-400">24h</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Wallet Status</h2>
            {wallet.connected ? (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="text-green-400">Connected</span>
                </div>
                <p className="text-sm text-gray-400 mb-1">Address:</p>
                <p className="text-electric-blue font-mono text-sm mb-2">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </p>
                <p className="text-sm text-gray-400 mb-1">Balance:</p>
                <p className="text-white font-semibold">{wallet.balance.toFixed(4)} ETH</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-400 mb-4">Wallet not connected</p>
                <button className="btn-primary w-full">Connect Wallet</button>
              </div>
            )}
          </div>
        </div>

        {/* Watchlist */}
        <div className="glass-card p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span>Watchlist</span>
            </h2>
            <Link to="/explore" className="text-electric-blue hover:text-electric-purple transition-colors">
              View All
            </Link>
          </div>
          {watchlistTokens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {watchlistTokens.map((token) => (
                <Link
                  key={token.id}
                  to={`/token/${token.id}`}
                  className="bg-navy-900/50 rounded-lg p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-electric-purple rounded-lg flex items-center justify-center text-xl">
                      {token.logo}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{token.name}</div>
                      <div className="text-sm text-gray-400">{token.symbol}</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Price</div>
                      <div className="text-white font-medium">${token.price.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">24H</div>
                      <div className={`font-medium ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Your watchlist is empty</p>
              <Link to="/explore" className="btn-primary inline-flex items-center space-x-2">
                <span>Explore Tokens</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <span className={`font-bold ${activity.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                      {activity.type === 'buy' ? '+' : '-'}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {activity.type === 'buy' ? 'Bought' : 'Sold'} {activity.amount} {activity.token}
                    </div>
                    <div className="text-sm text-gray-400">{activity.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${activity.value.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/trading" className="glass-card p-6 hover:glow-border transition-all group">
            <TrendingUp className="w-8 h-8 text-electric-blue mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Trade Tokens</h3>
            <p className="text-gray-400 text-sm">Buy and sell tokens with our simulated trading terminal</p>
          </Link>
          <Link to="/mlm-community" className="glass-card p-6 hover:glow-border transition-all group">
            <Star className="w-8 h-8 text-electric-purple mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Referral Program</h3>
            <p className="text-gray-400 text-sm">Earn commissions by referring projects to the platform</p>
          </Link>
          <Link to="/submit" className="glass-card p-6 hover:glow-border transition-all group">
            <Wallet className="w-8 h-8 text-electric-pink mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-white mb-2">Launch Project</h3>
            <p className="text-gray-400 text-sm">Submit your own token project with MLM compensation</p>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All portfolio data and activity are fictional for demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
