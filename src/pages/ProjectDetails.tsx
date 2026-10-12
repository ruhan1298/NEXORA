import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, TrendingUp, BarChart3, Search, Star, ChevronRight, CheckCircle, Users, DollarSign } from 'lucide-react';
import { Flame as FlameIcon } from 'lucide-react';

const ProjectDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-800">
      {/* Mobile Status Bar */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 text-xs text-white">
        <span>2:07</span>
        <span>4G LTE 53%</span>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Project Banner */}
        <div className="relative mb-6 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-purple-900 to-navy-900 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-pink to-electric-purple rounded-2xl flex items-center justify-center">
                <div className="text-3xl">⚡</div>
              </div>
              <span className="px-3 py-1 bg-navy-900 rounded-full text-xs text-gray-300 border border-white/10">
                Ethereum
              </span>
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-electric-purple rounded-full flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-white">Nexus Gaming</h1>
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                </div>
                <p className="text-accent-pink text-sm">NXG Gaming & Metaverse</p>
              </div>
            </div>
            <p className="text-gray-300 text-base mb-4">"Own your play. Build your universe."</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Total Raised</span>
                  <span className="text-white font-semibold">$325K / $500K</span>
                </div>
                <div className="w-full bg-navy-900 rounded-full h-3">
                  <div className="bg-gradient-to-r from-accent-pink to-electric-purple h-3 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>926 participants</span>
              </div>
            </div>
          </div>
        </div>

        <Link to="/launchpad" className="btn-primary w-full flex items-center justify-center space-x-2 mb-8">
          <span>Explore project</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Discover the market Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">Discover the market</h2>
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              <span className="text-xs text-accent-green font-semibold">LIVE</span>
            </span>
          </div>
          <p className="text-gray-400 mb-4">Stay ahead of the next wave.</p>
          <button className="text-accent-pink font-medium flex items-center">
            Explore all tokens <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-4 bg-navy-900 p-1 rounded-xl">
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm bg-accent-pink text-white">
            <FlameIcon className="w-4 h-4" />
            <span>Trending</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-400 hover:text-white">
            <TrendingUp className="w-4 h-4" />
            <span>Top Gainers</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm text-gray-400 hover:text-white">
            <BarChart3 className="w-4 h-4" />
            <span>New Listings</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tokens..."
            className="w-full bg-navy-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-pink/50"
          />
        </div>

        {/* Token List */}
        <div className="glass-card mb-4 overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs text-gray-500 uppercase tracking-wider border-b border-white/5">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Token</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h</div>
            <div className="col-span-2 text-right">MCap</div>
          </div>
          
          {/* Token 1 */}
          <div className="grid grid-cols-12 gap-2 items-center px-3 py-3 border-b border-white/5">
            <div className="col-span-1 flex items-center space-x-1">
              <span className="text-gray-500 text-xs">1</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
            <div className="col-span-5 flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm text-white font-bold">A</div>
              <div>
                <div className="font-semibold text-white text-sm">Aether AI</div>
                <div className="text-xs text-gray-400">AETH</div>
              </div>
            </div>
            <div className="col-span-2 text-right font-medium text-white text-sm">$1.2840</div>
            <div className="col-span-2 text-right font-medium text-accent-green text-sm">+18.42%</div>
            <div className="col-span-2 text-right text-gray-400 text-xs">$1.2M</div>
          </div>

          {/* Token 2 */}
          <div className="grid grid-cols-12 gap-2 items-center px-3 py-3 border-b border-white/5">
            <div className="col-span-1 flex items-center space-x-1">
              <span className="text-gray-500 text-xs">2</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
            </div>
            <div className="col-span-5 flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Orbit Protocol</div>
                <div className="text-xs text-gray-400">ORBT</div>
              </div>
            </div>
            <div className="col-span-2 text-right font-medium text-white text-sm">$0.4528</div>
            <div className="col-span-2 text-right font-medium text-accent-green text-sm">+12.76%</div>
            <div className="col-span-2 text-right text-gray-400 text-xs">$450K</div>
          </div>

          {/* Token 3 */}
          <div className="grid grid-cols-12 gap-2 items-center px-3 py-3 border-b border-white/5">
            <div className="col-span-1 flex items-center space-x-1">
              <span className="text-gray-500 text-xs">3</span>
              <Star className="w-3 h-3 text-gray-600" />
            </div>
            <div className="col-span-5 flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-sm text-white font-bold">V</div>
              <div>
                <div className="font-semibold text-white text-sm">Vertex Network</div>
                <div className="text-xs text-gray-400">VRTX</div>
              </div>
            </div>
            <div className="col-span-2 text-right font-medium text-white text-sm">$2.6410</div>
            <div className="col-span-2 text-right font-medium text-accent-red text-sm">-3.24%</div>
            <div className="col-span-2 text-right text-gray-400 text-xs">$2.6M</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-card p-4 mb-4">
          <h2 className="text-lg font-bold text-white mb-1">Your next big idea starts here.</h2>
          <p className="text-gray-400 text-sm mb-3">Launch your project. Build your community. Shape the future.</p>
          <Link to="/submit" className="btn-primary w-full flex items-center justify-center space-x-2 text-sm">
            <span>Submit a project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Referral Program */}
        <div className="glass-card p-4 mb-20">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-white mb-0.5">Referral program</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">MLM PROJECT REFERRAL PROGRAM</p>
            </div>
            <Link to="/mlm-community" className="text-accent-pink text-xs font-medium flex items-center">
              Dashboard preview <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <p className="text-gray-400 text-sm">Bring Projects. Earn Commissions. Build Your Network.</p>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-white/5 px-4 py-3 md:hidden">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <button className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>&lt; Chat</span>
            </button>
            <button className="w-10 h-10 bg-accent-pink rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full" />
            </button>
            <button className="flex items-center space-x-2 text-gray-400 text-sm">
              •••
            </button>
            <Link to="/submit" className="btn-primary text-sm px-4 py-2">
              Publish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
