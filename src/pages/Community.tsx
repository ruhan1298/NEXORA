import React, { useState } from 'react';
import { Copy, Check, Users, TrendingUp, Gift, Award, QrCode, Share2, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Community: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const referralCode = 'NEX-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  const referralLink = `https://nexora.io/ref/${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const teamData = [
    { level: 'Level 1', members: 12, active: 10, earnings: 1250 },
    { level: 'Level 2', members: 48, active: 35, earnings: 2400 },
    { level: 'Level 3', members: 156, active: 120, earnings: 4800 },
  ];

  const downline = [
    { id: 1, name: 'Alice0x123', joinDate: '2026-09-15', status: 'active', level: 1 },
    { id: 2, name: 'Bob0x456', joinDate: '2026-09-18', status: 'active', level: 1 },
    { id: 3, name: 'Charlie0x789', joinDate: '2026-09-20', status: 'inactive', level: 1 },
    { id: 4, name: 'Diana0xabc', joinDate: '2026-09-22', status: 'active', level: 2 },
    { id: 5, name: 'Eve0xdef', joinDate: '2026-09-25', status: 'active', level: 2 },
  ];

  const rewards = [
    { tier: 'Bronze', threshold: 0, progress: 100, reward: '$100' },
    { tier: 'Silver', threshold: 1000, progress: 75, reward: '$500' },
    { tier: 'Gold', threshold: 5000, progress: 45, reward: '$2000' },
    { tier: 'Platinum', threshold: 20000, progress: 20, reward: '$10000' },
  ];

  const earningsData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    earnings: Math.floor(Math.random() * 500) + 100,
  }));

  const activityFeed = [
    { type: 'referral', message: 'Alice0x123 joined through your link', time: '2 hours ago' },
    { type: 'earning', message: 'Earned $25 from Bob0x456 investment', time: '5 hours ago' },
    { type: 'milestone', message: 'Reached Silver tier!', time: '1 day ago' },
    { type: 'referral', message: 'Charlie0x789 joined through your link', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="bg-yellow/10 border border-yellow/30 rounded-lg p-4 flex items-center space-x-3">
        <span className="text-yellow">⚠️</span>
        <span className="text-yellow font-medium">Demo data only. No real payouts.</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Referral Dashboard</h1>
        <p className="text-gray-400">Build your network and earn rewards</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Total Earnings</span>
            <DollarSign className="w-5 h-5 text-green" />
          </div>
          <div className="text-3xl font-bold">$8,450</div>
          <div className="text-sm text-green mt-2">+15.3% this month</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Team Size</span>
            <Users className="w-5 h-5 text-blue" />
          </div>
          <div className="text-3xl font-bold">216</div>
          <div className="text-sm text-gray-400 mt-2">165 active</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Current Tier</span>
            <Award className="w-5 h-5 text-purple" />
          </div>
          <div className="text-3xl font-bold text-purple">Silver</div>
          <div className="text-sm text-gray-400 mt-2">75% to Gold</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Pending Rewards</span>
            <Gift className="w-5 h-5 text-yellow" />
          </div>
          <div className="text-3xl font-bold">$350</div>
          <button
            onClick={() => {
              setClaimed(true);
              setTimeout(() => setClaimed(false), 3000);
            }}
            className="text-sm text-blue hover:underline mt-2"
          >
            {claimed ? 'Claimed!' : 'Claim now'}
          </button>
        </div>
      </div>

      {/* Referral Link */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Your Referral Link</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-24 text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue rounded-lg text-sm hover:bg-blue/90 transition-colors flex items-center space-x-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-400">Code:</div>
            <div className="text-lg font-mono font-bold text-blue">{referralCode}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
          <QrCode className="w-4 h-4" />
          <span>QR code placeholder for mobile scanning</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Stats */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Team by Level</h3>
          <div className="space-y-4">
            {teamData.map((level) => (
              <div key={level.level} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{level.level}</span>
                  <span className="text-green font-semibold">${level.earnings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>{level.members} total members</span>
                  <span>{level.active} active</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue to-purple"
                    style={{ width: `${(level.active / level.members) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Earnings Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#666" tick={{ fill: '#999' }} />
                <YAxis stroke="#666" tick={{ fill: '#999' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Rewards Tiers */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Reward Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward) => (
            <div key={reward.tier} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{reward.tier}</span>
                <span className="text-green font-bold">{reward.reward}</span>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Threshold: ${reward.threshold.toLocaleString()}
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    reward.progress >= 100 ? 'bg-green' : 'bg-gradient-to-r from-blue to-purple'
                  }`}
                  style={{ width: `${reward.progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{reward.progress}% complete</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Downline */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Your Downline</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3">Member</th>
                  <th className="pb-3">Level</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {downline.map((member) => (
                  <tr key={member.id} className="border-b border-white/10">
                    <td className="py-3 font-medium">{member.name}</td>
                    <td className="py-3 text-gray-400">L{member.level}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        member.status === 'active' ? 'bg-green/20 text-green' : 'bg-red/20 text-red'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{member.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Team Activity</h3>
          <div className="space-y-4">
            {activityFeed.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'referral' ? 'bg-blue/20 text-blue' :
                  activity.type === 'earning' ? 'bg-green/20 text-green' :
                  'bg-purple/20 text-purple'
                }`}>
                  {activity.type === 'referral' && <Users className="w-4 h-4" />}
                  {activity.type === 'earning' && <DollarSign className="w-4 h-4" />}
                  {activity.type === 'milestone' && <Award className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Share2 className="w-6 h-6 text-blue" />
          <h3 className="text-xl font-semibold">Share Your Link</h3>
        </div>
        <p className="text-gray-400 mb-4">
          Share your referral link on social media, forums, and with friends to grow your network and earn more rewards.
        </p>
        <button className="btn-primary">Share on Twitter</button>
      </div>
    </div>
  );
};

export default Community;
