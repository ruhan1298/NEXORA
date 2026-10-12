import React, { useState } from 'react';
import { Check, X, Search, Activity, Users, DollarSign, AlertCircle, TrendingUp, Server, Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Mock pending submissions
  const [pendingSubmissions, setPendingSubmissions] = useState([
    {
      id: 'SUB-ABC123',
      name: 'CryptoVault',
      ticker: 'VAULT',
      category: 'DeFi',
      chain: 'Ethereum',
      targetRaise: 750000,
      submittedAt: new Date('2026-10-10'),
      status: 'pending',
    },
    {
      id: 'SUB-DEF456',
      name: 'GameVerse',
      ticker: 'GVERSE',
      category: 'Gaming',
      chain: 'Polygon',
      targetRaise: 500000,
      submittedAt: new Date('2026-10-09'),
      status: 'pending',
    },
    {
      id: 'SUB-GHI789',
      name: 'SocialChain',
      ticker: 'SOC',
      category: 'Social',
      chain: 'Solana',
      targetRaise: 1000000,
      submittedAt: new Date('2026-10-08'),
      status: 'pending',
    },
  ]);

  // Mock users
  const [users, setUsers] = useState([
    { id: 1, address: '0x7a3F...c91E', status: 'active', joined: '2026-09-01', volume: 125000 },
    { id: 2, address: '0x5b2E...d82F', status: 'active', joined: '2026-09-05', volume: 89000 },
    { id: 3, address: '0x9c4A...f73B', status: 'suspended', joined: '2026-09-10', volume: 45000 },
    { id: 4, address: '0x1d8C...b64A', status: 'active', joined: '2026-09-15', volume: 67000 },
    { id: 5, address: '0x4e7B...e95C', status: 'active', joined: '2026-09-20', volume: 156000 },
  ]);

  const handleApprove = (id: string) => {
    setPendingSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'approved' } : sub
    ));
  };

  const handleReject = (id: string) => {
    setPendingSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  const toggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
  };

  const activityData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    projects: Math.floor(Math.random() * 10) + 2,
    users: Math.floor(Math.random() * 50) + 20,
    volume: Math.floor(Math.random() * 500000) + 100000,
  }));

  const systemStatus = [
    { name: 'API Server', status: 'operational', uptime: '99.9%' },
    { name: 'Database', status: 'operational', uptime: '99.8%' },
    { name: 'CDN', status: 'operational', uptime: '99.9%' },
    { name: 'Blockchain Node', status: 'degraded', uptime: '98.5%' },
  ];

  const filteredSubmissions = pendingSubmissions.filter(sub =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.address.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Console</h1>
        <p className="text-gray-400">Manage platform operations and submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Total Projects</span>
            <Activity className="w-5 h-5 text-blue" />
          </div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-sm text-green mt-2">+2 this week</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Pending Reviews</span>
            <AlertCircle className="w-5 h-5 text-yellow" />
          </div>
          <div className="text-3xl font-bold">{pendingSubmissions.length}</div>
          <div className="text-sm text-gray-400 mt-2">Needs attention</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Total Users</span>
            <Users className="w-5 h-5 text-purple" />
          </div>
          <div className="text-3xl font-bold">2,456</div>
          <div className="text-sm text-green mt-2">+18.2% this month</div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Total Volume</span>
            <DollarSign className="w-5 h-5 text-green" />
          </div>
          <div className="text-3xl font-bold">$12.6M</div>
          <div className="text-sm text-green mt-2">+24.6% all time</div>
        </div>
      </div>

      {/* Platform Activity Chart */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Platform Activity (Last 7 Days)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#666" tick={{ fill: '#999' }} />
              <YAxis stroke="#666" tick={{ fill: '#999' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0D1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorVolume)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Submissions */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Pending Project Submissions</h3>
            <span className="px-2 py-1 bg-yellow/20 text-yellow rounded text-xs">
              {pendingSubmissions.length} pending
            </span>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue/50"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold">{submission.name}</div>
                    <div className="text-sm text-gray-400">{submission.ticker} • {submission.category}</div>
                  </div>
                  <span className="text-xs bg-blue/20 text-blue px-2 py-1 rounded">{submission.chain}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-400">Target: ${(submission.targetRaise / 1000).toFixed(0)}K</span>
                  <span className="text-gray-400">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(submission.id)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-green/20 text-green rounded-lg hover:bg-green/30 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(submission.id)}
                    className="flex-1 flex items-center justify-center space-x-1 py-2 bg-red/20 text-red rounded-lg hover:bg-red/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredSubmissions.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No pending submissions found.
              </div>
            )}
          </div>
        </div>

        {/* User Management */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">User Management</h3>
            <span className="text-sm text-gray-400">{users.length} users</span>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-blue/50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3">Address</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Volume</th>
                  <th className="pb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/10">
                    <td className="py-3 font-mono text-sm">{user.address}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === 'active' ? 'bg-green/20 text-green' : 'bg-red/20 text-red'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">${(user.volume / 1000).toFixed(0)}K</td>
                    <td className="py-3">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`text-xs px-2 py-1 rounded ${
                          user.status === 'active'
                            ? 'bg-red/20 text-red hover:bg-red/30'
                            : 'bg-green/20 text-green hover:bg-green/30'
                        } transition-colors`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No users found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStatus.map((system) => (
            <div key={system.name} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{system.name}</span>
                <div className={`w-2 h-2 rounded-full ${
                  system.status === 'operational' ? 'bg-green' : 'bg-yellow'
                }`} />
              </div>
              <div className="text-sm text-gray-400">
                Status: <span className={system.status === 'operational' ? 'text-green' : 'text-yellow'}>
                  {system.status}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">Uptime: {system.uptime}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
