import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Rocket,
  DollarSign,
  TrendingUp,
  Wallet,
  Users,
  Trophy,
  ExternalLink,
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { section: 'PLATFORM', items: [
      { path: '/', icon: LayoutDashboard, label: 'Overview' },
      { path: '/launchpad', icon: Rocket, label: 'Launchpad', badge: '4' },
      { path: '/tokens', icon: DollarSign, label: 'Explore Tokens' },
      { path: '/trade', icon: TrendingUp, label: 'Trading Terminal' },
      { path: '/portfolio', icon: Wallet, label: 'My Portfolio' },
      { path: '/community', icon: Users, label: 'Community', badge: 'NEW', badgeColor: 'purple' },
      { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    ]},
    { section: 'BUILD WITH NEXORA', items: [
      { path: '/submit', icon: ExternalLink, label: 'Submit a Project', external: true },
      { path: '/admin', icon: Settings, label: 'Admin Console' },
    ]},
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background-surface rounded-lg border border-white/10"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-background-surface border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold text-xl">NEXORA</span>
                <span className="w-2 h-2 bg-primary-blue rounded-full ml-1"></span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuItems.map((section) => (
              <div key={section.section}>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-4">
                  {section.section}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-text-primary transition-all duration-200 ${
                          isActive(item.path) ? 'bg-primary-blue/10 text-primary-cyan' : ''
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.badgeColor === 'purple'
                                ? 'bg-primary-purple/20 text-primary-purple'
                                : 'bg-primary-blue/20 text-primary-cyan'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {item.external && <ExternalLink className="w-4 h-4" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>All systems operational</span>
            </div>
            <div className="text-xs text-text-muted">
              © 2026 NEXORA v1.0.0
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
