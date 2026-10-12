import React from 'react';
import { GlassCard } from '../components/ui';

const MLMBuilder: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">MLM Plan Builder</h1>
        <p className="text-text-secondary text-lg">
          Design and configure MLM compensation plans for your project.
        </p>
      </div>

      <GlassCard className="p-12 text-center">
        <div className="text-6xl mb-4">🛠️</div>
        <h2 className="text-2xl font-display font-bold mb-4">Coming Soon</h2>
        <p className="text-text-secondary">
          The MLM Plan Builder is under development. Check back soon to configure your compensation plans.
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

export default MLMBuilder;
