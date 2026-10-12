import React from 'react';
import { GlassCard } from '../components/ui';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">About NEXORA</h1>
        <p className="text-text-secondary text-lg">
          NEXORA is a next-generation Web3 ecosystem designed for token launches, MLM project management, and digital asset discovery.
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Our Mission</h2>
        <p className="text-text-secondary mb-4">
          To democratize access to Web3 opportunities by providing a secure, transparent, and user-friendly platform for token launches and community-driven growth.
        </p>
        <p className="text-text-secondary">
          We believe in empowering projects to launch successfully while enabling communities to participate and benefit from the growth of the ecosystem.
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">What We Offer</h2>
        <ul className="space-y-3 text-text-secondary">
          <li>• Token Launchpad with vetted project listings</li>
          <li>• MLM plan builder for community-driven growth</li>
          <li>• Trading terminal with simulated demo mode</li>
          <li>• Comprehensive project discovery tools</li>
          <li>• Referral program with transparent commission tracking</li>
        </ul>
      </GlassCard>

      <div className="glass-card p-6 border border-warning/30">
        <p className="text-warning text-sm font-medium">
          ⚠️ This is a demo platform. All data is simulated. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default About;
