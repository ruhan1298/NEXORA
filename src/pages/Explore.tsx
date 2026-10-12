import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Flame, TrendingUp, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';
import { mockTokens } from '../data/mockData';

const Explore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'gainers' | 'new'>('trending');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'trending' as const, label: 'Trending', icon: Flame },
    { id: 'gainers' as const, label: 'Top Gainers', icon: TrendingUp },
    { id: 'new' as const, label: 'New Listings', icon: BarChart3 },
  ];

  const filteredTokens = mockTokens.filter((token) =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-white">Discover the market</h1>
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-accent-green rounded-full animate-pulse" />
              <span className="text-sm text-accent-green font-semibold">LIVE</span>
            </span>
          </div>
          <p className="text-gray-400 mb-4">Stay ahead of the next wave.</p>
          <button className="text-accent-pink font-medium flex items-center hover:underline">
            Explore all tokens <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 bg-navy-900 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-accent-pink text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-navy-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-accent-pink/50"
          />
        </div>

        {/* Token List */}
        <div className="glass-card mb-8 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs text-gray-500 uppercase tracking-wider border-b border-white/10">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Token</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-2 text-right">Market Cap</div>
          </div>
          {filteredTokens.map((token, index) => (
            <Link
              key={token.id}
              to={`/token/${token.id}`}
              className="grid grid-cols-12 gap-4 items-center px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="col-span-1 flex items-center space-x-2">
                <span className="text-gray-500">{index + 1}</span>
                <Star className="w-4 h-4 text-gray-600" />
              </div>
              <div className="col-span-5 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-electric-purple rounded-full flex items-center justify-center text-xl">
                  {token.logo}
                </div>
                <div>
                  <div className="font-semibold text-white">{token.name}</div>
                  <div className="text-sm text-gray-400">{token.symbol}</div>
                </div>
              </div>
              <div className="col-span-2 text-right font-medium text-white">${token.price.toFixed(4)}</div>
              <div className={`col-span-2 text-right font-medium ${
                token.change24h >= 0 ? 'text-accent-green' : 'text-accent-red'
              }`}>
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </div>
              <div className="col-span-2 text-right text-gray-400">
                ${(token.marketCap / 1000000).toFixed(1)}M
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Your next big idea starts here.</h2>
          <p className="text-gray-400 mb-6">Launch your project. Build your community. Shape the future.</p>
          <Link to="/submit" className="btn-primary inline-flex items-center space-x-2">
            <span>Submit a project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Referral Program */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Referral program</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">MLM PROJECT REFERRAL PROGRAM</p>
            </div>
            <Link to="/mlm-community" className="text-accent-pink font-medium flex items-center hover:underline">
              Dashboard preview <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <p className="text-gray-400">Bring Projects. Earn Commissions. Build Your Network.</p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All data is fictional for demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
