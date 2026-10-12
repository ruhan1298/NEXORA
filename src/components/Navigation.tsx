import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X, Zap, LayoutDashboard, Rocket, TrendingUp, BarChart3, Users, Star, FileText, Settings, Activity, Shield, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const location = useLocation();
  const { wallet, connectWallet, disconnectWallet } = useApp();

  const platformItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/launchpad', label: 'Launchpad', icon: Rocket, badge: '4' },
    { path: '/discover', label: 'Explore Tokens', icon: TrendingUp },
    { path: '/trading', label: 'Trading Terminal', icon: BarChart3 },
    { path: '/dashboard', label: 'My Portfolio', icon: Activity },
    { path: '/mlm-community', label: 'Community', icon: Users, badge: 'NEW' },
    { path: '/leaderboard', label: 'Leaderboard', icon: Star },
  ];

  const buildItems = [
    { path: '/submit', label: 'Submit a Project', icon: FileText, external: true },
    { path: '/admin', label: 'Admin Console', icon: Shield, external: true },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 sidebar flex-col z-50">
        <div className="p-6">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-pink to-electric-purple rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wider">NEXORA</span>
          </Link>
        </div>

        <div className="flex-1 px-4 space-y-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Platform</div>
            <div className="space-y-1">
              {platformItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`menu-item ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs bg-accent-pink/20 text-accent-pink px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Build with NEXORA</div>
            <div className="space-y-1">
              {buildItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`menu-item ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.external && <ExternalLink className="w-4 h-4 text-gray-400" />}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="status-dot" />
              <span className="text-xs text-gray-400">All systems operational</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-xs text-gray-500">© 2026 NEXORA v1.0.0</div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-lg border-b border-white/5">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-pink to-electric-purple rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wider">NEXORA</span>
            </Link>

            <div className="flex items-center space-x-3">
              {wallet.connected ? (
                <button
                  onClick={disconnectWallet}
                  className="btn-secondary text-xs px-3 py-2"
                >
                  {wallet.address.slice(0, 4)}...{wallet.address.slice(-4)}
                </button>
              ) : (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="btn-primary text-xs px-3 py-2"
                >
                  Connect
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="bg-navy-800 border-t border-white/5">
            <div className="px-4 py-4 space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Platform</div>
                <div className="space-y-1">
                  {platformItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`menu-item ${
                        location.pathname === item.path ? 'active' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-accent-pink/20 text-accent-pink px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">Build with NEXORA</div>
                <div className="space-y-1">
                  {buildItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`menu-item ${
                        location.pathname === item.path ? 'active' : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.external && <ExternalLink className="w-4 h-4 text-gray-400" />}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="glass-card p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Connect Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  connectWallet('metamask');
                  setShowWalletModal(false);
                }}
                className="w-full btn-secondary flex items-center justify-center space-x-3"
              >
                <Wallet className="w-5 h-5" />
                <span>MetaMask</span>
              </button>
              <button
                onClick={() => {
                  connectWallet('walletconnect');
                  setShowWalletModal(false);
                }}
                className="w-full btn-secondary flex items-center justify-center space-x-3"
              >
                <Wallet className="w-5 h-5" />
                <span>WalletConnect</span>
              </button>
              <button
                onClick={() => {
                  connectWallet('demo');
                  setShowWalletModal(false);
                }}
                className="w-full btn-primary flex items-center justify-center space-x-3"
              >
                <Wallet className="w-5 h-5" />
                <span>Demo Wallet</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Demo mode - No real wallet connection required
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
