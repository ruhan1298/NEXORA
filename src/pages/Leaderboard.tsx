import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, Award, Search } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('traders');
  const [timeframe, setTimeframe] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'traders', label: 'Top Traders', icon: TrendingUp },
    { id: 'referrers', label: 'Top Referrers', icon: Users },
    { id: 'investors', label: 'Top Investors', icon: Award },
  ];

  const timeframes = ['all', 'week', 'month'];

  const generateLeaderboardData = (type: string) => {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        rank: i,
        address: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        value: type === 'traders' ? Math.floor(Math.random() * 500000) + 50000 :
               type === 'referrers' ? Math.floor(Math.random() * 10000) + 1000 :
               Math.floor(Math.random() * 1000000) + 100000,
        change: Math.floor(Math.random() * 50) - 10,
      });
    }
    return data.sort((a, b) => b.value - a.value);
  };

  const leaderboardData = generateLeaderboardData(activeTab);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return null;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-yellow font-bold';
    if (rank === 2) return 'text-gray-400 font-bold';
    if (rank === 3) return 'text-orange-400 font-bold';
    return 'text-gray-400';
  };

  const filteredData = leaderboardData.filter(entry =>
    entry.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-gray-400">See who's leading the pack</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Timeframe Filter */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">Timeframe:</span>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-blue/50"
        />
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.slice(0, 3).map((entry, index) => {
          const rank = index + 1;
          const order = rank === 1 ? 1 : rank === 2 ? 0 : 2;
          const height = rank === 1 ? 'h-48' : rank === 2 ? 'h-36' : 'h-28';
          
          return (
            <div
              key={entry.rank}
              className={`glass-card p-6 text-center ${rank === 1 ? 'border-yellow/30 shadow-lg shadow-yellow/10' : ''}`}
              style={{ order }}
            >
              <div className="flex justify-center mb-4">
                {getMedalIcon(rank)}
              </div>
              <div className={`text-4xl font-bold mb-2 ${getRankStyle(rank)}`}>#{rank}</div>
              <div className="text-sm text-gray-400 mb-2 font-mono">{entry.address}</div>
              <div className="text-2xl font-bold text-blue mb-1">
                ${entry.value.toLocaleString()}
              </div>
              <div className={`text-sm ${entry.change >= 0 ? 'text-green' : 'text-red'}`}>
                {entry.change >= 0 ? '+' : ''}{entry.change}%
              </div>
              <div className={`mt-4 mx-auto w-full bg-gradient-to-t from-blue/20 to-transparent rounded-t-lg ${height}`} />
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                <th className="pb-4 px-6">Rank</th>
                <th className="pb-4 px-6">Address</th>
                <th className="pb-4 px-6">
                  {activeTab === 'traders' ? 'Trading Volume' :
                   activeTab === 'referrers' ? 'Referrals' : 'Investment'}
                </th>
                <th className="pb-4 px-6">Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => (
                <tr key={entry.rank} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getMedalIcon(entry.rank)}
                      <span className={getRankStyle(entry.rank)}>#{entry.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-sm">{entry.address}</td>
                  <td className="py-4 px-6 font-bold text-blue">
                    ${entry.value.toLocaleString()}
                  </td>
                  <td className={`py-4 px-6 ${entry.change >= 0 ? 'text-green' : 'text-red'}`}>
                    {entry.change >= 0 ? '+' : ''}{entry.change}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No results found for your search.
          </div>
        )}
      </div>

      {/* Your Rank */}
      <div className="glass-card p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue/20 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-blue" />
          </div>
          <div>
            <div className="text-sm text-gray-400">Your Rank</div>
            <div className="text-2xl font-bold">#42</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Value</div>
          <div className="text-xl font-bold text-blue">$12,450</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Change</div>
          <div className="text-xl font-bold text-green">+15%</div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
