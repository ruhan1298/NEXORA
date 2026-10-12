import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, TrendingDown, ArrowUpDown, Search, Filter } from 'lucide-react';
import { mockTokens as tokens } from '../data/tokens';
import { usePortfolioStore } from '../lib/store';
import { LineChart, Line } from 'recharts';

const Tokens: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { watchlist, toggleWatchlist } = usePortfolioStore();

  const categories = ['all', ...Array.from(new Set(tokens.map(t => t.network)))];

  const filteredAndSortedTokens = tokens
    .filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(token => categoryFilter === 'all' || token.network === categoryFilter)
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'price':
          return (a.price - b.price) * multiplier;
        case 'change24h':
          return (a.change24h - b.change24h) * multiplier;
        case 'marketCap':
          return (a.marketCap - b.marketCap) * multiplier;
        case 'volume':
          return (a.volume24h - b.volume24h) * multiplier;
        case 'liquidity':
          return (a.liquidity - b.liquidity) * multiplier;
        default:
          return 0;
      }
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
    const chartData = data.map((value, index) => ({ index, value }));
    return (
      <div className="w-20 h-8">
        <LineChart width={80} height={32} data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-text-primary">Explore Tokens</h1>
          <p className="text-text-secondary">Discover and trade the hottest tokens in the market</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-3 flex-1">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary-blue/50 transition-colors text-text-primary placeholder-text-muted"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-blue/50 text-text-primary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-background-surface">
                  {cat === 'all' ? 'All Networks' : cat}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary-blue/50 text-text-primary"
            >
              <option value="marketCap" className="bg-background-surface">Sort by: Market Cap</option>
              <option value="price" className="bg-background-surface">Sort by: Price</option>
              <option value="change24h" className="bg-background-surface">Sort by: 24h Change</option>
              <option value="volume" className="bg-background-surface">Sort by: Volume</option>
              <option value="liquidity" className="bg-background-surface">Sort by: Liquidity</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center space-x-2 text-text-primary"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(0, 8).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
              categoryFilter === cat
                ? 'bg-primary-blue text-white'
                : 'bg-white/5 text-text-secondary hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Token Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-text-secondary text-sm border-b border-white/10">
                <th className="pb-4 px-6"></th>
                <th className="pb-4 px-6">Token</th>
                <th className="pb-4 px-6 cursor-pointer hover:text-text-primary" onClick={() => handleSort('price')}>
                  Price {sortBy === 'price' && <ArrowUpDown className="inline w-3 h-3 ml-1" />}
                </th>
                <th className="pb-4 px-6 cursor-pointer hover:text-text-primary" onClick={() => handleSort('change24h')}>
                  24h Change {sortBy === 'change24h' && <ArrowUpDown className="inline w-3 h-3 ml-1" />}
                </th>
                <th className="pb-4 px-6 cursor-pointer hover:text-text-primary" onClick={() => handleSort('marketCap')}>
                  Market Cap {sortBy === 'marketCap' && <ArrowUpDown className="inline w-3 h-3 ml-1" />}
                </th>
                <th className="pb-4 px-6 cursor-pointer hover:text-text-primary" onClick={() => handleSort('volume')}>
                  Volume (24h) {sortBy === 'volume' && <ArrowUpDown className="inline w-3 h-3 ml-1" />}
                </th>
                <th className="pb-4 px-6 cursor-pointer hover:text-text-primary" onClick={() => handleSort('liquidity')}>
                  Liquidity {sortBy === 'liquidity' && <ArrowUpDown className="inline w-3 h-3 ml-1" />}
                </th>
                <th className="pb-4 px-6">7D Chart</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedTokens.map((token) => (
                <tr key={token.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleWatchlist(token.symbol)}
                      className={`${
                        watchlist.includes(token.symbol) ? 'text-warning' : 'text-text-muted'
                      } hover:text-warning transition-colors`}
                    >
                      <Star className={`w-5 h-5 ${watchlist.includes(token.symbol) ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <Link to={`/tokens/${token.symbol}`} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-purple rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {token.symbol[0]}
                      </div>
                      <div>
                        <div className="font-medium text-text-primary">{token.name}</div>
                        <div className="text-sm text-text-secondary">{token.symbol}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-medium text-text-primary">${token.price.toFixed(4)}</td>
                  <td className="py-4 px-6">
                    <div className={`flex items-center space-x-1 ${
                      token.change24h >= 0 ? 'text-success' : 'text-danger'
                    }`}>
                      {token.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">${(token.marketCap / 1000000).toFixed(2)}M</td>
                  <td className="py-4 px-6 text-text-secondary">${(token.volume24h / 1000000).toFixed(2)}M</td>
                  <td className="py-4 px-6 text-text-secondary">${(token.liquidity / 1000000).toFixed(2)}M</td>
                  <td className="py-4 px-6">
                    {token.sparkline && (
                      <Sparkline
                        data={token.sparkline}
                        color={token.change24h >= 0 ? '#22F5A0' : '#FF4D6D'}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedTokens.length === 0 && (
          <div className="p-12 text-center text-text-secondary">
            No tokens found matching your search.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          Showing {filteredAndSortedTokens.length} tokens
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors disabled:opacity-50 text-text-primary" disabled>
            Previous
          </button>
          <button className="px-4 py-2 bg-primary-blue rounded-lg text-sm text-white">1</button>
          <button className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors text-text-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tokens;
