import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, CheckCircle, Filter, ArrowUpDown, Calendar, Users, DollarSign } from 'lucide-react';
import { mockProjects as projects } from '../data/projects';

const ProjectCard: React.FC<{ project: any; status: string }> = ({ project, status }) => {
  const progress = (project.raised / project.target) * 100;
  
  const getTimeRemaining = () => {
    if (status !== 'upcoming' || !project.launchDate) return '';
    const now = new Date();
    const start = new Date(project.launchDate);
    const diff = start.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden hover:shadow-lg hover:shadow-primary-blue/10 transition-all cursor-pointer"
    >
      <div className="h-36 bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 flex items-center justify-center relative">
        <div className="text-5xl">{project.logo}</div>
        {project.auditStatus === 'verified' && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-text-primary">{project.name}</h3>
          <span className="text-xs bg-primary-blue/20 text-primary-cyan px-2 py-1 rounded">{project.network}</span>
        </div>
        <p className="text-sm text-text-secondary mb-3">{project.description}</p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs bg-white/10 px-2 py-1 rounded text-text-secondary">{project.category}</span>
        </div>

        {status === 'upcoming' && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-1">
              <Clock className="w-4 h-4" />
              <span>Starts in</span>
            </div>
            <div className="text-lg font-bold text-primary-cyan">{getTimeRemaining()}</div>
          </div>
        )}

        {status === 'live' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Progress</span>
              <span className="text-text-primary">${(project.raised / 1000).toFixed(0)}K / ${(project.target / 1000).toFixed(0)}K</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-blue to-primary-purple transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2 text-text-secondary">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{project.team?.length || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{progress.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-success/10 rounded-lg text-center">
              <div className="text-xs text-text-secondary mb-1">Status</div>
              <div className="text-lg font-bold text-success">Completed</div>
            </div>
            <div className="p-3 bg-primary-blue/10 rounded-lg text-center">
              <div className="text-xs text-text-secondary mb-1">Total Raised</div>
              <div className="text-lg font-bold text-primary-cyan">${(project.raised / 1000).toFixed(0)}K</div>
            </div>
          </div>
        )}

        <button className="w-full btn-primary py-2">
          {status === 'upcoming' ? 'Set Reminder' : status === 'live' ? 'Invest Now' : 'View Details'}
        </button>
      </div>
    </motion.div>
  );
};

const Launchpad: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [chainFilter, setChainFilter] = useState('all');
  const [sortBy, setSortBy] = useState('raise');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: Clock },
    { id: 'live', label: 'Live', icon: TrendingUp },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  const categories = ['all', 'DeFi', 'Gaming', 'Infrastructure', 'Social', 'Metaverse', 'ESG'];
  const chains = ['all', 'Ethereum', 'Polygon', 'Solana', 'BSC'];

  const filteredProjects = projects
    .filter(p => p.status === activeTab)
    .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
    .filter(p => chainFilter === 'all' || p.network === chainFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'raise':
          return b.raised - a.raised;
        case 'participants':
          return (b.team?.length || 0) - (a.team?.length || 0);
        case 'date':
          return new Date(b.launchDate || 0).getTime() - new Date(a.launchDate || 0).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Launchpad</h1>
          <p className="text-gray-400">Discover and invest in the next generation of Web3 projects</p>
        </div>
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
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {projects.filter(p => p.status === tab.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue/50"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-card">
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              value={chainFilter}
              onChange={(e) => setChainFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue/50"
            >
              {chains.map(chain => (
                <option key={chain} value={chain} className="bg-card">
                  {chain === 'all' ? 'All Chains' : chain}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue/50"
            >
              <option value="raise" className="bg-card">Sort by: Amount Raised</option>
              <option value="participants" className="bg-card">Sort by: Team Size</option>
              <option value="date" className="bg-card">Sort by: Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} status={activeTab} />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <p className="text-gray-400">No projects found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Launchpad;
