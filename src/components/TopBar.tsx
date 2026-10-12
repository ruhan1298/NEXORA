import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import ConnectWalletModal from './ConnectWalletModal';

const TopBar: React.FC<{ title: string }> = ({ title }) => {
  const { isConnected, address, disconnect } = useWallet();
  const [showWalletModal, setShowWalletModal] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="h-16 border-b border-white/10 bg-background-secondary flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-card border border-white/10 rounded-lg px-3 py-2 w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none ml-2 text-sm w-full text-white placeholder-gray-500"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {/* Connect Wallet */}
        {isConnected ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="btn-primary text-sm"
            >
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-white/10 rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b border-white/10">
                  <div className="text-xs text-gray-400">Balance</div>
                  <div className="text-sm font-semibold">12.5 ETH</div>
                </div>
                <button
                  onClick={() => {
                    disconnect();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red hover:bg-white/5 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowWalletModal(true)}
            className="btn-primary animate-glow"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {showWalletModal && (
        <ConnectWalletModal onClose={() => setShowWalletModal(false)} />
      )}
    </header>
  );
};

export default TopBar;
