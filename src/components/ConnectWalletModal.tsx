import React, { useState } from 'react';
import { X, Wallet, Globe, Link as LinkIcon } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';

const ConnectWalletModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { connect } = useWallet();
  const [connecting, setConnecting] = useState<string | null>(null);

  const wallets = [
    { id: 'metamask', name: 'MetaMask', icon: Globe, color: 'orange' },
    { id: 'walletconnect', name: 'WalletConnect', icon: LinkIcon, color: 'blue' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: Wallet, color: 'blue' },
    { id: 'phantom', name: 'Phantom', icon: Wallet, color: 'purple' },
  ];

  const handleConnect = async (walletId: string) => {
    setConnecting(walletId);
    await connect(walletId);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card border border-white/10 rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Connect Wallet</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => handleConnect(wallet.id)}
                disabled={connecting !== null}
                className="w-full flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <wallet.icon className="w-8 h-8 text-blue" />
                <span className="flex-1 text-left font-medium">{wallet.name}</span>
                {connecting === wallet.id && (
                  <div className="w-5 h-5 border-2 border-blue border-t-transparent rounded-full animate-spin" />
                )}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            By connecting your wallet, you agree to our Terms of Service
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConnectWalletModal;
