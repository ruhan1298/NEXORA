import React from 'react';
import { GlassCard } from '../components/ui';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
        <p className="text-text-secondary text-lg">
          Last updated: October 2026
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="text-text-secondary">
          By accessing and using NEXORA, you agree to be bound by these Terms of Service.
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">2. Demo Platform Disclaimer</h2>
        <p className="text-text-secondary mb-4">
          NEXORA is a DEMO platform. All data, prices, transactions, and features are simulated for demonstration purposes only.
        </p>
        <p className="text-text-secondary">
          No real financial transactions occur on this platform. Do not make investment decisions based on demo data.
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">3. User Responsibilities</h2>
        <ul className="space-y-2 text-text-secondary">
          <li>• Use the platform for lawful purposes only</li>
          <li>• Do not share sensitive information or private keys</li>
          <li>• Understand that all data is fictional</li>
          <li>• Do not rely on demo data for financial decisions</li>
        </ul>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">4. Limitation of Liability</h2>
        <p className="text-text-secondary">
          NEXORA is not responsible for any losses resulting from the use of this demo platform. This is a simulation only.
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

export default Terms;
