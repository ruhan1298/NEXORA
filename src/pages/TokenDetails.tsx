import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Star, Copy, Check } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockTokens as tokens } from '../data/tokens';
import { usePortfolioStore } from '../lib/store';

const TokenDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [timeframe, setTimeframe] = useState('1D');
  const [copied, setCopied] = useState(false);
  const { watchlist, toggleWatchlist } = usePortfolioStore();

  const token = tokens.find(t => t.symbol === symbol);

  if (!token) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Token not found</h2>
        <Link to="/tokens" className="text-blue hover:underline">Back to tokens</Link>
      </div>
    );
  }

  const timeframes = ['1H', '1D', '1W', '1M', '1Y'];

  // Generate mock price chart data
  const generateChartData = (points: number) => {
    const data = [];
    let price = token.price;
    for (let i = 0; i < points; i++) {
      data.push({
        time: i,
        price: price,
      });
      price = price * (1 + (Math.random() - 0.5) * 0.02);
    }
    return data;
  };

  const chartData = generateChartData(24);

  const tokenomicsData = [
    { name: 'Team', value: 20, color: '#3B82F6' },
    { name: 'Investors', value: 15, color: '#8B5CF6' },
    { name: 'Community', value: 35, color: '#22C55E' },
    { name: 'Liquidity', value: 20, color: '#F59E0B' },
    { name: 'Treasury', value: 10, color: '#EF4444' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token.symbol);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/tokens" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="w-12 h-12 bg-gradient-to-br from-blue to-purple rounded-full flex items-center justify-center text-xl font-bold">
          {token.symbol[0]}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{token.name}</h1>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>{token.symbol}</span>
            <span className="text-blue">•</span>
            <span>{token.category}</span>
          </div>
        </div>
        <button
          onClick={() => toggleWatchlist(token.symbol)}
          className={`p-2 rounded-lg transition-colors ${
            watchlist.includes(token.symbol) ? 'bg-yellow/20 text-yellow' : 'bg-white/5 text-gray-400 hover:text-yellow'
          }`}
        >
          <Star className={`w-5 h-5 ${watchlist.includes(token.symbol) ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Price Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400 mb-1">Price</div>
          <div className="text-2xl font-bold">${token.price.toFixed(4)}</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400 mb-1">24h Change</div>
          <div className={`text-2xl font-bold ${token.change24h >= 0 ? 'text-green' : 'text-red'}`}>
            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400 mb-1">Market Cap</div>
          <div className="text-2xl font-bold">${(token.marketCap / 1000000).toFixed(2)}M</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-sm text-gray-400 mb-1">Volume (24h)</div>
          <div className="text-2xl font-bold">${(token.volume / 1000000).toFixed(2)}M</div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Price Chart</h2>
          <div className="flex space-x-2">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  timeframe === tf
                    ? 'bg-blue text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#666" tick={{ fill: '#999' }} />
              <YAxis stroke="#666" tick={{ fill: '#999' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tokenomics */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-6">Tokenomics</h2>
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {tokenomicsData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">About {token.name}</h2>
          <p className="text-gray-400 mb-6">
            {token.name} is a leading {token.category.toLowerCase()} token that provides innovative solutions
            for the decentralized ecosystem. With strong community support and continuous development,
            it has established itself as a prominent player in the market.
          </p>

          <h3 className="text-md font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 text-gray-400 mb-6">
            <li className="flex items-start space-x-2">
              <span className="text-green mt-1">✓</span>
              <span>Decentralized governance</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green mt-1">✓</span>
              <span>High liquidity and low fees</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green mt-1">✓</span>
              <span>Cross-chain compatibility</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green mt-1">✓</span>
              <span>Active development team</span>
            </li>
          </ul>

          <h3 className="text-md font-semibold mb-3">Links</h3>
          <div className="space-y-2">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-sm text-gray-400">Contract Address</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">0x7a3F...c91E</span>
                {copied ? <Check className="w-4 h-4 text-green" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </div>
            </button>
            <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-sm">Website</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-sm">Whitepaper</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link to="/trade" className="flex-1 btn-primary text-center py-3">
          Buy {token.symbol}
        </Link>
        <Link to="/trade" className="flex-1 btn-secondary text-center py-3">
          Trade {token.symbol}
        </Link>
      </div>
    </div>
  );
};

export default TokenDetails;
