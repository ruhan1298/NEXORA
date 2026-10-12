import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const location = useLocation();
  const { wallet, connectWallet, disconnectWallet } = useApp();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/launchpad', label: 'Launchpad' },
    { path: '/explore', label: 'Explore Tokens' },
    { path: '/mlm-community', label: 'MLM Community' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/submit', label: 'Submit Project' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-electric-purple rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">NEXORA</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link text-sm font-medium ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {wallet.connected ? (
                <button
                  onClick={disconnectWallet}
                  className="btn-secondary text-sm"
                >
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </button>
              ) : (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="btn-primary text-sm"
                >
                  Connect Wallet
                </button>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-navy-800 border-t border-white/10">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block nav-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {wallet.connected ? (
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsOpen(false);
                  }}
                  className="w-full btn-secondary text-sm"
                >
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowWalletModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full btn-primary text-sm"
                >
                  Connect Wallet
                </button>
              )}
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
