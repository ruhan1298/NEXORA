import React, { useState } from 'react';
import { Users, FolderOpen, DollarSign, Settings, Check, X, Eye, Edit } from 'lucide-react';
import { mockProjects } from '../data/mockData';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'tokens' | 'users' | 'settings'>('projects');

  const submissions = [
    { id: 1, name: 'New Project Alpha', status: 'pending', submitted: '2024-10-10', submitter: 'user@example.com' },
    { id: 2, name: 'DeFi Protocol X', status: 'pending', submitted: '2024-10-09', submitter: 'team@defi.io' },
    { id: 3, name: 'Token Launch Y', status: 'approved', submitted: '2024-10-08', submitter: 'dev@token.io' },
  ];

  const tabs = [
    { id: 'projects' as const, label: 'Projects', icon: FolderOpen },
    { id: 'tokens' as const, label: 'Tokens', icon: DollarSign },
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const handleApprove = (id: number) => {
    alert(`Project ${id} approved (Demo)`);
  };

  const handleReject = (id: number) => {
    alert(`Project ${id} rejected (Demo)`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage platform submissions and configurations</p>
        </div>

        {/* Warning Banner */}
        <div className="glass-card p-4 mb-8 border-l-4 border-yellow-500">
          <p className="text-sm text-yellow-400">
            ⚠️ Demo Admin Interface - This is a frontend demo only. Production deployment requires secure server-side authentication, authorization, and database integration.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <FolderOpen className="w-8 h-8 text-electric-blue mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{mockProjects.length}</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="glass-card p-6">
            <Users className="w-8 h-8 text-electric-purple mb-3" />
            <div className="text-3xl font-bold text-white mb-1">1,234</div>
            <div className="text-sm text-gray-400">Registered Users</div>
          </div>
          <div className="glass-card p-6">
            <DollarSign className="w-8 h-8 text-electric-pink mb-3" />
            <div className="text-3xl font-bold text-white mb-1">$45.2K</div>
            <div className="text-sm text-gray-400">Total Volume</div>
          </div>
          <div className="glass-card p-6">
            <Check className="w-8 h-8 text-green-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">5</div>
            <div className="text-sm text-gray-400">Pending Reviews</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-electric-blue border-b-2 border-electric-blue'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6">Project Submissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Project</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Submitter</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Submitted</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-white/5">
                      <td className="px-6 py-4 text-white font-medium">{submission.name}</td>
                      <td className="px-6 py-4 text-gray-300">{submission.submitter}</td>
                      <td className="px-6 py-4 text-gray-400">{submission.submitted}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          submission.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {submission.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          {submission.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(submission.id)}
                                className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                              >
                                <Check className="w-4 h-4 text-green-400" />
                              </button>
                              <button
                                onClick={() => handleReject(submission.id)}
                                className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <X className="w-4 h-4 text-red-400" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tokens Tab */}
        {activeTab === 'tokens' && (
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6">Token Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Token</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Symbol</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Network</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProjects.map((project) => (
                    <tr key={project.id} className="border-b border-white/5">
                      <td className="px-6 py-4 text-white font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-gray-300">{project.symbol}</td>
                      <td className="px-6 py-4 text-gray-400">{project.network}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'live' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {project.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">User</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Email</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Role</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                    <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 1, name: 'Admin User', email: 'admin@nexora.io', role: 'Admin', status: 'active' },
                    { id: 2, name: 'Project Owner', email: 'owner@project.io', role: 'User', status: 'active' },
                    { id: 3, name: 'Referral Partner', email: 'partner@referral.io', role: 'Partner', status: 'active' },
                  ].map((user) => (
                    <tr key={user.id} className="border-b border-white/5">
                      <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 text-gray-400">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-6">Platform Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Commission Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Direct Referral Commission (%)</label>
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Maximum Referral Levels</label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Project Approval</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/20 bg-navy-900 text-electric-blue" />
                    <span className="text-gray-300">Require audit verification</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/20 bg-navy-900 text-electric-blue" />
                    <span className="text-gray-300">Manual approval required</span>
                  </label>
                </div>
              </div>

              <button className="btn-primary">Save Settings</button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All admin actions are simulated. No real changes are made to any system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
