import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { mockTokens } from '../data/mockData';
import { useApp } from '../context/AppContext';

const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [networkFilter, setNetworkFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'marketCap' | 'volume' | 'liquidity'>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { watchlist, addToWatchlist, removeFromWatchlist } = useApp();

  const filteredTokens = mockTokens
    .filter((token) => {
      const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesNetwork = networkFilter === 'all' || token.network === networkFilter;
      return matchesSearch && matchesNetwork;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      return (a[sortBy] - b[sortBy]) * modifier;
    });

  const handleSort = (field: 'price' | 'marketCap' | 'volume' | 'liquidity') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Explore Tokens</h1>
          <p className="text-gray-400 text-lg">
            Discover and analyze tokens across multiple blockchains
          </p>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tokens by name or symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
              />
            </div>
            <select
              value={networkFilter}
              onChange={(e) => setNetworkFilter(e.target.value)}
              className="bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
            >
              <option value="all">All Networks</option>
              <option value="Ethereum">Ethereum</option>
              <option value="BSC">BSC</option>
              <option value="Polygon">Polygon</option>
              <option value="Avalanche">Avalanche</option>
            </select>
          </div>
        </div>

        {/* Token Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Token</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Project</th>
                  <th
                    className="text-right px-6 py-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center justify-end space-x-2">
                      <span>Price</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">24H Change</th>
                  <th
                    className="text-right px-6 py-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('marketCap')}
                  >
                    <div className="flex items-center justify-end space-x-2">
                      <span>Market Cap</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className="text-right px-6 py-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('volume')}
                  >
                    <div className="flex items-center justify-end space-x-2">
                      <span>24H Volume</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th
                    className="text-right px-6 py-4 text-gray-400 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('liquidity')}
                  >
                    <div className="flex items-center justify-end space-x-2">
                      <span>Liquidity</span>
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Network</th>
                  <th className="text-center px-6 py-4 text-gray-400 font-medium">Watchlist</th>
                </tr>
              </thead>
              <tbody>
                {filteredTokens.map((token) => (
                  <tr key={token.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/token/${token.id}`} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-electric-purple rounded-lg flex items-center justify-center text-xl">
                          {token.logo}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{token.name}</div>
                          <div className="text-sm text-gray-400">{token.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{token.project}</td>
                    <td className="px-6 py-4 text-right font-medium text-white">${token.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${
                        token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {token.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{Math.abs(token.change24h).toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-300">{formatNumber(token.marketCap)}</td>
                    <td className="px-6 py-4 text-right text-gray-300">{formatNumber(token.volume24h)}</td>
                    <td className="px-6 py-4 text-right text-gray-300">{formatNumber(token.liquidity)}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                        {token.network}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          if (watchlist.includes(token.id)) {
                            removeFromWatchlist(token.id);
                          } else {
                            addToWatchlist(token.id);
                          }
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          watchlist.includes(token.id)
                            ? 'text-yellow-400 hover:text-yellow-300'
                            : 'text-gray-400 hover:text-yellow-400'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${watchlist.includes(token.id) ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTokens.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tokens found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All token data and prices are fictional for demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
