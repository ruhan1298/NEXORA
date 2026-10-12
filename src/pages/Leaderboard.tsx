import React from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { mockLeaderboard } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</span>;
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/10 border-yellow-500/30';
    if (rank === 2) return 'bg-gray-500/10 border-gray-500/30';
    if (rank === 3) return 'bg-amber-500/10 border-amber-500/30';
    return '';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Community Leaderboard</h1>
          <p className="text-gray-400 text-lg">
            Top referrers and most active community members
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {mockLeaderboard.slice(0, 3).map((user, index) => (
            <div
              key={user.rank}
              className={`glass-card p-6 text-center ${getRankClass(user.rank)} ${
                index === 1 ? 'md:mt-8' : ''
              }`}
            >
              <div className="flex justify-center mb-4">
                {getRankIcon(user.rank)}
              </div>
              <div className="text-2xl font-bold text-white mb-2">{user.username}</div>
              <div className="text-gray-400 mb-4">Rank #{user.rank}</div>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-400">Referrals</div>
                  <div className="text-xl font-bold text-electric-blue">{user.referrals}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Commission</div>
                  <div className="text-xl font-bold text-electric-purple">${user.commission.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">All Rankings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Rank</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Username</th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">Referrals</th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">Commission</th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockLeaderboard.map((user) => (
                  <tr key={user.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-electric-purple rounded-full flex items-center justify-center text-white font-bold">
                          {user.username.charAt(0)}
                        </div>
                        <span className="text-white font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 text-electric-blue">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-semibold">{user.referrals}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-electric-purple font-semibold">
                      ${user.commission.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leaderboard Info */}
        <div className="glass-card p-6 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">How Rankings Work</h3>
          <div className="space-y-3 text-gray-300">
            <p>• Rankings are based on verified platform-service referrals, not investment deposits</p>
            <p>• Commissions are calculated from eligible platform fees and service purchases</p>
            <p>• Rankings update daily based on total verified commissions earned</p>
            <p>• Top performers receive bonus rewards and recognition</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All leaderboard data and rankings are fictional for demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
