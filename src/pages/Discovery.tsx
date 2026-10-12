import React from 'react';
import { GlassCard } from '../components/ui';

const Discovery: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">Discovery</h1>
        <p className="text-text-secondary text-lg">
          Discover new MLM projects before they launch.
        </p>
      </div>

      <GlassCard className="p-12 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-display font-bold mb-4">Coming Soon</h2>
        <p className="text-text-secondary">
          The Discovery section is under development. Check back soon for new project discoveries.
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

export default Discovery;
