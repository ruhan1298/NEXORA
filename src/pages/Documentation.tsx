import React from 'react';
import { GlassCard } from '../components/ui';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">Documentation</h1>
        <p className="text-text-secondary text-lg">
          Learn how to use NEXORA's features and services.
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Getting Started</h2>
        <div className="space-y-4 text-text-secondary">
          <p>
            1. Connect your wallet to access the platform features.
          </p>
          <p>
            2. Browse the launchpad to discover upcoming token launches.
          </p>
          <p>
            3. Participate in launches or submit your own project.
          </p>
          <p>
            4. Join the referral program to earn commissions.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Launchpad Guide</h2>
        <p className="text-text-secondary mb-4">
          The launchpad allows projects to raise funds through token sales. All projects are vetted before listing.
        </p>
        <p className="text-text-secondary">
          Investors can participate in token sales using connected wallets. Always do your own research before investing.
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">MLM Referral Program</h2>
        <p className="text-text-secondary mb-4">
          Our referral program rewards users for bringing new projects to the platform. Commissions are based on verified platform-service revenue only.
        </p>
        <p className="text-text-secondary">
          Note: No commissions are calculated from token purchases, deposits, or investor recruitment.
        </p>
      </GlassCard>

      <div className="glass-card p-6 border border-warning/30">
        <p className="text-warning text-sm font-medium">
          ⚠️ This is a demo platform. All data is simulated. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default Documentation;
