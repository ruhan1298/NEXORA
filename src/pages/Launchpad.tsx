import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, Flame, CheckCircle, ExternalLink } from 'lucide-react';
import { mockProjects } from '../data/mockData';

const Launchpad: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live' | 'completed'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProjects = mockProjects.filter((project) => {
    const matchesTab = project.status === activeTab;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || project.network === categoryFilter;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'upcoming' as const, label: 'Upcoming', icon: Clock },
    { id: 'live' as const, label: 'Live Projects', icon: Flame },
    { id: 'completed' as const, label: 'Completed', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">MLM Token Launchpad</h1>
          <p className="text-gray-400 text-lg">
            Discover and participate in token launches with MLM compensation models
          </p>
        </div>

        {/* Search and Filter */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-navy-900 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card p-6 hover:glow-border transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-electric-purple rounded-xl flex items-center justify-center text-3xl">
                    {project.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    <p className="text-electric-blue font-medium">{project.symbol}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
                  project.status === 'live' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Network</span>
                  <span className="text-white">{project.network}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Supply</span>
                  <span className="text-white">{(project.supply / 1000000).toFixed(0)}M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Launch Date</span>
                  <span className="text-white">{project.launchDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">MLM Plan</span>
                  <span className="text-white">{project.mlmPlanType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Referral Levels</span>
                  <span className="text-white">{project.referralLevels}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-navy-900 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-electric-blue to-electric-purple h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <Link
                to={`/project/${project.id}`}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <span>View Details</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching your criteria</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - All projects and data are fictional for demonstration purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Launchpad;
