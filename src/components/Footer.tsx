import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from './ui';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-surface border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="full" size="lg" />
            </Link>
            <p className="text-text-secondary text-sm mb-6 max-w-sm">
              The next-generation ecosystem for token launches, MLM project management, community growth and digital asset discovery.
            </p>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link to="/launchpad" className="hover:text-text-primary transition-colors">Launchpad</Link></li>
              <li><Link to="/tokens" className="hover:text-text-primary transition-colors">Explore Tokens</Link></li>
              <li><Link to="/trade" className="hover:text-text-primary transition-colors">Trading Terminal</Link></li>
              <li><Link to="/community" className="hover:text-text-primary transition-colors">MLM Community</Link></li>
              <li><Link to="/leaderboard" className="hover:text-text-primary transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link to="/about" className="hover:text-text-primary transition-colors">About</Link></li>
              <li><Link to="/documentation" className="hover:text-text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/submit" className="hover:text-text-primary transition-colors">Submit Project</Link></li>
              <li><Link to="/discovery" className="hover:text-text-primary transition-colors">Discovery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link to="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/risk-disclosure" className="hover:text-text-primary transition-colors">Risk Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="glass-card p-4 mb-6">
            <p className="text-center text-sm text-text-secondary">
              <span className="text-warning font-semibold">⚠️ Demo Platform:</span> All data is simulated. This is not financial advice. Do not make investment decisions based on this demo.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-text-muted">
              &copy; 2026 NEXORA. All rights reserved.
            </p>
            <p className="text-sm text-text-muted">
              Built with ❤️ for the Web3 community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
