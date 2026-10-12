import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Users, Zap, Shield, Rocket, BarChart3, Network } from 'lucide-react';

const Home: React.FC = () => {
  const stats = [
    { icon: Rocket, label: 'Total Listed Projects', value: '156', color: 'text-electric-blue' },
    { icon: TrendingUp, label: 'Upcoming Launches', value: '24', color: 'text-electric-purple' },
    { icon: Zap, label: 'Listed Tokens', value: '89', color: 'text-electric-pink' },
    { icon: Users, label: 'Community Members', value: '12.5K', color: 'text-electric-blue' },
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Token Launchpad',
      description: 'Launch your token with configurable MLM compensation plans and multi-level referral systems.',
    },
    {
      icon: Network,
      title: 'MLM Ecosystem',
      description: 'Build powerful referral networks with customizable commission structures and team rewards.',
    },
    {
      icon: BarChart3,
      title: 'Token Explorer',
      description: 'Discover and analyze tokens across multiple blockchains with real-time market data.',
    },
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'All projects undergo rigorous security audits and verification processes.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Launch Tokens.</span>
              <br />
              <span className="text-white">Build Networks.</span>
              <br />
              <span className="text-gradient">Explore Web3.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              The next-generation ecosystem for token launches, MLM project management, community growth and digital asset discovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore" className="btn-primary text-lg">
                Explore Projects
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
              <Link to="/submit" className="btn-secondary text-lg">
                Launch Your Project
              </Link>
              <Link to="/mlm-community" className="btn-secondary text-lg">
                Join Referral Program
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Platform Features</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to launch, manage, and grow your Web3 project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card p-6 hover:glow-border transition-all duration-300">
                <feature.icon className="w-12 h-12 text-electric-blue mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gradient mb-6">Ready to Launch Your Project?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of project owners building the future of Web3 with NEXORA
          </p>
          <Link to="/submit" className="btn-primary text-lg">
            Get Started Now
            <ArrowRight className="inline ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-navy-800 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500 text-center">
            ⚠️ Disclaimer: This is a demo platform with simulated data. Not financial advice. All statistics and market data are fictional for demonstration purposes only.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
