import React, { useState } from 'react';
import { Users, Copy, Check, TrendingUp, DollarSign, Clock, Share2 } from 'lucide-react';
import { mockReferralStats } from '../data/mockData';

const MLMCommunity: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { icon: Users, label: 'Total Referred', value: mockReferralStats.totalReferred, color: 'text-electric-blue' },
    { icon: Check, label: 'Approved Referrals', value: mockReferralStats.approved, color: 'text-green-400' },
    { icon: Clock, label: 'Pending Referrals', value: mockReferralStats.pending, color: 'text-yellow-400' },
    { icon: DollarSign, label: 'Earned Commission', value: `$${mockReferralStats.earnedCommission.toFixed(2)}`, color: 'text-electric-purple' },
    { icon: TrendingUp, label: 'Conversion Rate', value: `${mockReferralStats.conversionRate}%`, color: 'text-electric-pink' },
  ];

  const recentReferrals = [
    { id: 1, name: 'Project Alpha', status: 'approved', commission: 450.00, date: '2024-10-10' },
    { id: 2, name: 'DeFi Protocol', status: 'approved', commission: 320.00, date: '2024-10-09' },
    { id: 3, name: 'Token Launch', status: 'pending', commission: 180.00, date: '2024-10-08' },
    { id: 4, name: 'Staking Platform', status: 'approved', commission: 275.00, date: '2024-10-07' },
    { id: 5, name: 'Yield Farm', status: 'pending', commission: 210.00, date: '2024-10-06' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">MLM Community Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Track your referrals and earn commissions from platform services
          </p>
        </div>

        {/* Referral Link */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Your Referral Link</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-navy-900 rounded-lg px-4 py-3 flex items-center">
              <code className="text-electric-blue break-all">{mockReferralStats.referralLink}</code>
            </div>
            <button
              onClick={copyReferralLink}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Commission Banner */}
        <div className="glass-card p-6 mb-8 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-1">Pending Commission</h3>
              <p className="text-gray-300">${mockReferralStats.pendingCommission.toFixed(2)} awaiting approval</p>
            </div>
            <div className="text-3xl font-bold text-white">${mockReferralStats.pendingCommission.toFixed(2)}</div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Recent Referral History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Project</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">Commission</th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-white/5">
                    <td className="px-6 py-4 text-white">{referral.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {referral.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-electric-blue font-medium">
                      ${referral.commission.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">{referral.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Rules */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Commission Rules</h2>
          <div className="space-y-3 text-gray-300">
            <p>• Commissions are earned from verified platform-service referrals only</p>
            <p>• Direct referral: 10% commission on eligible platform fees</p>
            <p>• Multi-level: Up to 5 levels with decreasing percentages (10%, 5%, 3%, 2%, 1%)</p>
            <p>• Commissions are calculated based on verified revenue, not token purchases</p>
            <p>• Minimum payout threshold: $100</p>
            <p>• Payout processing time: 7-14 business days</p>
          </div>
        </div>

        {/* Referral Network Tree (Simplified) */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Referral Network</h2>
          <div className="bg-navy-900 rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-electric-purple rounded-full flex items-center justify-center text-white font-bold">
                YOU
              </div>
              <div className="w-px h-8 bg-electric-blue/50" />
              <div className="flex space-x-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-electric-blue/30 rounded-full flex items-center justify-center text-white text-sm">
                    L1
                  </div>
                  <div className="w-px h-4 bg-electric-blue/30" />
                  <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-electric-purple/30 rounded-full flex items-center justify-center text-white text-xs">
                      L2
                    </div>
                    <div className="w-8 h-8 bg-electric-purple/30 rounded-full flex items-center justify-center text-white text-xs">
                      L2
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-electric-blue/30 rounded-full flex items-center justify-center text-white text-sm">
                    L1
                  </div>
                  <div className="w-px h-4 bg-electric-blue/30" />
                  <div className="w-8 h-8 bg-electric-purple/30 rounded-full flex items-center justify-center text-white text-xs">
                    L2
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-electric-blue/30 rounded-full flex items-center justify-center text-white text-sm">
                    L1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All commission data and statistics are fictional for demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLMCommunity;
