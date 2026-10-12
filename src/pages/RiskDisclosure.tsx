import React from 'react';
import { GlassCard } from '../components/ui';

const RiskDisclosure: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold mb-4">Risk Disclosure</h1>
        <p className="text-text-secondary text-lg">
          Important information about risks associated with cryptocurrency and Web3 investments.
        </p>
      </div>

      <GlassCard className="p-8 border border-danger/30">
        <h2 className="text-2xl font-display font-bold mb-4 text-danger">⚠️ Important Warning</h2>
        <p className="text-text-secondary mb-4">
          This is a DEMO platform. All data shown is simulated and fictional. Do not make any financial decisions based on this platform.
        </p>
        <p className="text-text-secondary">
          Real cryptocurrency investments carry significant risks. You could lose your entire investment.
        </p>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">General Risks</h2>
        <ul className="space-y-3 text-text-secondary">
          <li>• <strong>Volatility:</strong> Cryptocurrency prices are highly volatile and can change rapidly.</li>
          <li>• <strong>Loss of Capital:</strong> You may lose some or all of your invested capital.</li>
          <li>• <strong>Regulatory Risk:</strong> Regulations vary by jurisdiction and may change.</li>
          <li>• <strong>Technical Risk:</strong> Smart contracts and platforms may have vulnerabilities.</li>
          <li>• <strong>Liquidity Risk:</strong> Some tokens may have low liquidity.</li>
        </ul>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">MLM-Specific Risks</h2>
        <ul className="space-y-3 text-text-secondary">
          <li>• <strong>No Guaranteed Returns:</strong> MLM programs do not guarantee profits.</li>
          <li>• <strong>Recruitment Risk:</strong> Be wary of programs that focus on recruitment over product value.</li>
          <li>• <strong>Commission Structure:</strong> Understand how commissions are calculated before participating.</li>
          <li>• <strong>Sustainability:</strong> MLM models may not be sustainable long-term.</li>
        </ul>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Due Diligence</h2>
        <p className="text-text-secondary mb-4">
          Before investing in any cryptocurrency or MLM program:
        </p>
        <ul className="space-y-2 text-text-secondary">
          <li>• Research the project team and their background</li>
          <li>• Read the whitepaper and understand the tokenomics</li>
          <li>• Check for audits and security verifications</li>
          <li>• Understand the MLM compensation plan thoroughly</li>
          <li>• Only invest what you can afford to lose</li>
          <li>• Consult with a financial advisor if needed</li>
        </ul>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-display font-bold mb-4">Not Financial Advice</h2>
        <p className="text-text-secondary">
          Nothing on this platform constitutes financial advice. All information is for educational and demonstration purposes only. Always conduct your own research and consult with qualified professionals before making investment decisions.
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

export default RiskDisclosure;
