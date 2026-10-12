import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wider">NEXORA</h3>
            <p className="text-gray-400 text-sm">
              Next-generation Web3 ecosystem for token launches, MLM project management, and digital asset discovery.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/launchpad" className="hover:text-white transition-colors">Launchpad</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore Tokens</Link></li>
              <li><Link to="/mlm-community" className="hover:text-white transition-colors">MLM Community</Link></li>
              <li><Link to="/submit" className="hover:text-white transition-colors">Submit Project</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 NEXORA. All rights reserved. Demo platform - not real financial advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
