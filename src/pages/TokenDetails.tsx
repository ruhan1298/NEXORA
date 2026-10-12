import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ExternalLink, Copy, Check } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTokens, mockProjects } from '../data/mockData';

const TokenDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [timeFilter, setTimeFilter] = useState<'1H' | '24H' | '7D' | '30D'>('24H');

  const token = mockTokens.find((t) => t.id === id);
  const project = mockProjects.find((p) => p.id === id);

  if (!token) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-lg">Token not found</p>
          <Link to="/explore" className="btn-primary inline-block mt-4">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const chartData = [
    { time: '00:00', price: token.price * 0.95 },
    { time: '04:00', price: token.price * 0.97 },
    { time: '08:00', price: token.price * 0.94 },
    { time: '12:00', price: token.price * 1.02 },
    { time: '16:00', price: token.price * 1.05 },
    { time: '20:00', price: token.price * 1.03 },
    { time: '24:00', price: token.price },
  ];

  const timeFilters = ['1H', '24H', '7D', '30D'] as const;

  const copyAddress = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/explore" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Explore
        </Link>

        {/* Token Header */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-electric-purple rounded-xl flex items-center justify-center text-3xl">
                {token.logo}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{token.name}</h1>
                <p className="text-electric-blue font-medium text-lg">{token.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">${token.price.toFixed(2)}</div>
              <div className={`flex items-center justify-end space-x-1 ${
                token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg">{token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-navy-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Market Cap</div>
              <div className="text-white font-semibold">${(token.marketCap / 1000000).toFixed(2)}M</div>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">24H Volume</div>
              <div className="text-white font-semibold">${(token.volume24h / 1000000).toFixed(2)}M</div>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Liquidity</div>
              <div className="text-white font-semibold">${(token.liquidity / 1000000).toFixed(2)}M</div>
            </div>
            <div className="bg-navy-900/50 rounded-lg p-4">
              <div className="text-gray-400 text-sm mb-1">Network</div>
              <div className="text-white font-semibold">{token.network}</div>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="glass-card p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Price Chart</h2>
            <div className="flex space-x-2">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    timeFilter === filter
                      ? 'bg-electric-blue text-white'
                      : 'bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
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

        {/* Token Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">About {token.name}</h2>
            <p className="text-gray-300 mb-4">
              {token.project} is a pioneering project in the Web3 space, offering innovative solutions
              for decentralized finance and token utility. Built on {token.network}, it provides users
              with unique opportunities for growth and participation.
            </p>
            {project && (
              <>
                <h3 className="text-lg font-semibold text-white mb-2">MLM Compensation Plan</h3>
                <p className="text-gray-300 mb-2">
                  <strong>Type:</strong> {project.mlmPlanType}
                </p>
                <p className="text-gray-300 mb-2">
                  <strong>Referral Levels:</strong> {project.referralLevels}
                </p>
                <p className="text-gray-300">
                  <strong>Tokenomics:</strong> {project.tokenomics}
                </p>
              </>
            )}
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Contract Information</h2>
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Contract Address</div>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-navy-900 px-3 py-2 rounded text-sm text-electric-blue break-all">
                    0x1234...5678
                  </code>
                  <button
                    onClick={copyAddress}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-1">Blockchain Explorer</div>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-electric-blue hover:text-electric-purple transition-colors"
                >
                  <span>View on {token.network} Explorer</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              {project && (
                <>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Audit Status</div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.auditStatus === 'verified' ? 'bg-green-500/20 text-green-400' :
                      project.auditStatus === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {project.auditStatus?.toUpperCase()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Risk Disclosure */}
        <div className="glass-card p-6 border-l-4 border-yellow-500">
          <h3 className="text-lg font-bold text-yellow-400 mb-2">⚠️ Risk Disclosure</h3>
          <p className="text-gray-300 text-sm">
            This is a demo platform with simulated data. All prices, market data, and project information
            are fictional for demonstration purposes only. This is not financial advice. Always conduct
            your own research before investing in any cryptocurrency or token project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
