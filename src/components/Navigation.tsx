import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X, LayoutDashboard, Rocket, TrendingUp, BarChart3, Users, Star, FileText, Settings, Activity, Shield, ExternalLink, Search, Home, Globe, ChevronDown } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { Logo } from './ui';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const location = useLocation();
  const { wallet, connectWallet, disconnectWallet } = useWallet();

  const platformItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/launchpad', label: 'Launchpad', icon: Rocket },
    { path: '/tokens', label: 'Explore Tokens', icon: TrendingUp },
    { path: '/trade', label: 'Trading Terminal', icon: BarChart3 },
    { path: '/portfolio', label: 'User Dashboard', icon: LayoutDashboard },
    { path: '/community', label: 'MLM Community', icon: Users },
    { path: '/leaderboard', label: 'Leaderboard', icon: Star },
  ];

  const buildItems = [
    { path: '/submit', label: 'Submit Project', icon: FileText },
    { path: '/mlm-builder', label: 'MLM Plan Builder', icon: Settings },
    { path: '/discovery', label: 'Discovery', icon: Globe },
  ];

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setShowCommandPalette(!showCommandPalette);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCommandPalette]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background-base/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Logo variant="full" size="lg" />
            </Link>

            <div className="flex items-center space-x-1">
              {platformItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link px-3 py-2 rounded-lg relative ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-cyan to-primary-purple rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCommandPalette(true)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs bg-white/10 rounded text-text-muted">⌘K</kbd>
              </button>

              {wallet.connected ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-sm font-bold">
                      {wallet.address.slice(0, 2)}
                    </div>
                    <span className="text-sm font-mono">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</span>
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 glass-card py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-2 border-b border-white/10">
                      <div className="text-xs text-text-muted">Balance</div>
                      <div className="text-sm font-mono">2.45 ETH</div>
                    </div>
                    <button
                      onClick={disconnectWallet}
                      className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-white/5 transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="btn-primary text-sm"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background-base/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <Logo variant="full" size="md" />
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
          <div className="bg-background-surface border-t border-white/10 max-h-[70vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              <div>
                <div className="text-xs text-text-muted uppercase tracking-wider mb-3 px-2">Platform</div>
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
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-text-muted uppercase tracking-wider mb-3 px-2">Build</div>
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
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-display font-bold">Connect Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
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
            <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-xs text-warning font-medium">
                ⚠️ Demo mode only. Never share your seed phrase or private keys.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Command Palette */}
      {showCommandPalette && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card p-4 w-full max-w-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search tokens, projects, or navigate..."
                className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder-text-muted"
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs bg-white/10 rounded text-text-muted">ESC</kbd>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-text-muted uppercase tracking-wider px-2">Quick Actions</div>
              {[...platformItems, ...buildItems].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowCommandPalette(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-text-muted" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
