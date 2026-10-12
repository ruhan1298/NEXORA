import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Users, Zap, Activity, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Overview</h1>
            <p className="text-gray-400">Welcome back to NEXORA</p>
          </div>
          <button className="btn-primary">Connect Wallet</button>
        </div>

        {/* Stats Grid - Screenshot matching */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Total Raised</div>
                <div className="text-4xl font-bold text-white">$12.64M</div>
              </div>
              <TrendingUp className="w-10 h-10 text-accent-green" />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-green rounded-full" />
                <span>+24.5%</span>
              </div>
              <span>vs last month</span>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Community Members</div>
                <div className="text-4xl font-bold text-white">4,891</div>
              </div>
              <Users className="w-10 h-10 text-accent-pink" />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-pink rounded-full" />
                <span>+156</span>
              </div>
              <span>new this week</span>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 hover:glow-border transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-pink to-electric-purple rounded-xl flex items-center justify-center text-2xl">
                    🔷
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Project {i}</h3>
                    <p className="text-accent-pink text-sm">TOKEN{i}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-400">Raised</span>
                  <span className="text-white font-semibold">$2.5M</span>
                </div>
                <div className="w-full bg-navy-900 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-accent-pink to-electric-purple h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <Link to="/launchpad" className="btn-secondary w-full text-center">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/explore" className="glass-card p-6 hover:glow-border transition-all duration-300 group">
            <Activity className="w-12 h-12 text-electric-blue mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Explore Tokens</h3>
            <p className="text-gray-400 text-sm">Discover new token projects</p>
          </Link>
          <Link to="/submit" className="glass-card p-6 hover:glow-border transition-all duration-300 group">
            <Rocket className="w-12 h-12 text-accent-pink mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Launch Project</h3>
            <p className="text-gray-400 text-sm">Submit your token project</p>
          </Link>
          <Link to="/mlm-community" className="glass-card p-6 hover:glow-border transition-all duration-300 group">
            <Zap className="w-12 h-12 text-electric-purple mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Referral Program</h3>
            <p className="text-gray-400 text-sm">Earn commissions</p>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Launch Tokens. Build Networks. Explore Web3.</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            The next-generation ecosystem for token launches, MLM project management, community growth and digital asset discovery.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/explore" className="btn-primary">
              Explore Projects
            </Link>
            <Link to="/submit" className="btn-secondary">
              Launch Your Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
