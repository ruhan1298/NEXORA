import React from 'react';
import { GlassCard } from '../components/ui';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
        <p className="text-text-secondary text-lg">
          Last updated: October 2026
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">1. Data Collection</h2>
        <p className="text-text-secondary mb-4">
          As a demo platform, NEXORA does not collect personal data. All interactions are simulated.
        </p>
        <p className="text-text-secondary">
          Some data may be stored locally in your browser for demo functionality (e.g., wallet connection state, watchlist).
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">2. Local Storage</h2>
        <p className="text-text-secondary">
          We use browser localStorage to persist demo settings such as wallet connection, watchlist, and portfolio data. This data remains on your device.
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">3. No Real Transactions</h2>
        <p className="text-text-secondary">
          No real financial or personal data is transmitted or stored. All wallet connections are simulated.
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

export default Privacy;
