import React, { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

interface FormData {
  projectName: string;
  ticker: string;
  category: string;
  tagline: string;
  description: string;
  chain: string;
  tokenPrice: string;
  totalSupply: string;
  targetRaise: string;
  teamAllocation: string;
  investorAllocation: string;
  communityAllocation: string;
  liquidityAllocation: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  teamName: string;
  teamEmail: string;
}

const Submit: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    ticker: '',
    category: '',
    tagline: '',
    description: '',
    chain: '',
    tokenPrice: '',
    totalSupply: '',
    targetRaise: '',
    teamAllocation: '',
    investorAllocation: '',
    communityAllocation: '',
    liquidityAllocation: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    teamName: '',
    teamEmail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const steps = [
    { id: 1, title: 'Project Info' },
    { id: 2, title: 'Token Details' },
    { id: 3, title: 'Tokenomics' },
    { id: 4, title: 'Links & Team' },
    { id: 5, title: 'Review' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.projectName) newErrors.projectName = 'Project name is required';
      if (!formData.ticker) newErrors.ticker = 'Ticker is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.tagline) newErrors.tagline = 'Tagline is required';
      if (!formData.description) newErrors.description = 'Description is required';
      if (!formData.chain) newErrors.chain = 'Chain is required';
    }

    if (step === 2) {
      if (!formData.tokenPrice) newErrors.tokenPrice = 'Token price is required';
      if (!formData.totalSupply) newErrors.totalSupply = 'Total supply is required';
      if (!formData.targetRaise) newErrors.targetRaise = 'Target raise is required';
    }

    if (step === 3) {
      const total = parseFloat(formData.teamAllocation) + 
                    parseFloat(formData.investorAllocation) + 
                    parseFloat(formData.communityAllocation) + 
                    parseFloat(formData.liquidityAllocation);
      if (Math.abs(total - 100) > 0.1) {
        newErrors.allocation = 'Total allocation must equal 100%';
      }
    }

    if (step === 4) {
      if (!formData.website) newErrors.website = 'Website is required';
      if (!formData.teamName) newErrors.teamName = 'Team name is required';
      if (!formData.teamEmail) newErrors.teamEmail = 'Team email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const id = 'SUB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setSubmissionId(id);
      setSubmitted(true);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-12 text-center">
          <div className="w-20 h-20 bg-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Project Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Your project has been submitted for review. Our team will review your submission and get back to you within 3-5 business days.
          </p>
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-400 mb-1">Submission ID</div>
            <div className="text-xl font-mono font-bold text-blue">{submissionId}</div>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
              setFormData({
                projectName: '',
                ticker: '',
                category: '',
                tagline: '',
                description: '',
                chain: '',
                tokenPrice: '',
                totalSupply: '',
                targetRaise: '',
                teamAllocation: '',
                investorAllocation: '',
                communityAllocation: '',
                liquidityAllocation: '',
                website: '',
                twitter: '',
                telegram: '',
                discord: '',
                teamName: '',
                teamEmail: '',
              });
            }}
            className="btn-primary"
          >
            Submit Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Your Project</h1>
        <p className="text-gray-400">Launch your project on NEXORA and reach thousands of investors</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step.id
                  ? 'bg-blue text-white'
                  : 'bg-white/5 text-gray-400'
              }`}
            >
              {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
            </div>
            <span
              className={`ml-2 text-sm ${
                currentStep >= step.id ? 'text-white' : 'text-gray-400'
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-gray-600 mx-4" />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="glass-card p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Project Information</h2>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Project Name *</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => handleChange('projectName', e.target.value)}
                className={`w-full bg-white/5 border ${errors.projectName ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="Enter project name"
              />
              {errors.projectName && <p className="text-red text-sm mt-1">{errors.projectName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Token Ticker *</label>
              <input
                type="text"
                value={formData.ticker}
                onChange={(e) => handleChange('ticker', e.target.value.toUpperCase())}
                className={`w-full bg-white/5 border ${errors.ticker ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="e.g., BTC, ETH"
                maxLength={10}
              />
              {errors.ticker && <p className="text-red text-sm mt-1">{errors.ticker}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full bg-white/5 border ${errors.category ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
              >
                <option value="">Select category</option>
                <option value="DeFi">DeFi</option>
                <option value="Gaming">Gaming</option>
                <option value="AI & Infrastructure">AI & Infrastructure</option>
                <option value="Social">Social</option>
                <option value="NFT">NFT</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="ESG">ESG</option>
                <option value="Privacy">Privacy</option>
                <option value="Security">Security</option>
              </select>
              {errors.category && <p className="text-red text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Tagline *</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className={`w-full bg-white/5 border ${errors.tagline ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="A short catchy description"
                maxLength={100}
              />
              {errors.tagline && <p className="text-red text-sm mt-1">{errors.tagline}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className={`w-full bg-white/5 border ${errors.description ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50 h-32`}
                placeholder="Describe your project in detail"
                maxLength={1000}
              />
              {errors.description && <p className="text-red text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Blockchain *</label>
              <select
                value={formData.chain}
                onChange={(e) => handleChange('chain', e.target.value)}
                className={`w-full bg-white/5 border ${errors.chain ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
              >
                <option value="">Select blockchain</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Polygon">Polygon</option>
                <option value="Solana">Solana</option>
                <option value="Arbitrum">Arbitrum</option>
                <option value="BSC">BSC</option>
              </select>
              {errors.chain && <p className="text-red text-sm mt-1">{errors.chain}</p>}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Token Details</h2>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token Price (USD) *</label>
              <input
                type="number"
                step="0.0001"
                value={formData.tokenPrice}
                onChange={(e) => handleChange('tokenPrice', e.target.value)}
                className={`w-full bg-white/5 border ${errors.tokenPrice ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="0.00"
              />
              {errors.tokenPrice && <p className="text-red text-sm mt-1">{errors.tokenPrice}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Total Supply *</label>
              <input
                type="number"
                value={formData.totalSupply}
                onChange={(e) => handleChange('totalSupply', e.target.value)}
                className={`w-full bg-white/5 border ${errors.totalSupply ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="1000000"
              />
              {errors.totalSupply && <p className="text-red text-sm mt-1">{errors.totalSupply}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Target Raise (USD) *</label>
              <input
                type="number"
                value={formData.targetRaise}
                onChange={(e) => handleChange('targetRaise', e.target.value)}
                className={`w-full bg-white/5 border ${errors.targetRaise ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="500000"
              />
              {errors.targetRaise && <p className="text-red text-sm mt-1">{errors.targetRaise}</p>}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Tokenomics</h2>
            <p className="text-sm text-gray-400 mb-4">Total allocation must equal 100%</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Team Allocation (%)</label>
                <input
                  type="number"
                  value={formData.teamAllocation}
                  onChange={(e) => handleChange('teamAllocation', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                  placeholder="20"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Investor Allocation (%)</label>
                <input
                  type="number"
                  value={formData.investorAllocation}
                  onChange={(e) => handleChange('investorAllocation', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                  placeholder="15"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Community Allocation (%)</label>
                <input
                  type="number"
                  value={formData.communityAllocation}
                  onChange={(e) => handleChange('communityAllocation', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                  placeholder="35"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Liquidity Allocation (%)</label>
                <input
                  type="number"
                  value={formData.liquidityAllocation}
                  onChange={(e) => handleChange('liquidityAllocation', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                  placeholder="30"
                />
              </div>
            </div>

            {errors.allocation && (
              <div className="flex items-center space-x-2 text-red text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.allocation}</span>
              </div>
            )}

            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Total</div>
              <div className="text-2xl font-bold">
                {(parseFloat(formData.teamAllocation) + 
                  parseFloat(formData.investorAllocation) + 
                  parseFloat(formData.communityAllocation) + 
                  parseFloat(formData.liquidityAllocation)).toFixed(1)}%
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Links & Team</h2>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Website *</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className={`w-full bg-white/5 border ${errors.website ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="https://"
              />
              {errors.website && <p className="text-red text-sm mt-1">{errors.website}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Twitter</label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                placeholder="https://twitter.com/"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Telegram</label>
              <input
                type="url"
                value={formData.telegram}
                onChange={(e) => handleChange('telegram', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                placeholder="https://t.me/"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Discord</label>
              <input
                type="url"
                value={formData.discord}
                onChange={(e) => handleChange('discord', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue/50"
                placeholder="https://discord.gg/"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Team/Company Name *</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => handleChange('teamName', e.target.value)}
                className={`w-full bg-white/5 border ${errors.teamName ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="Your team name"
              />
              {errors.teamName && <p className="text-red text-sm mt-1">{errors.teamName}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Contact Email *</label>
              <input
                type="email"
                value={formData.teamEmail}
                onChange={(e) => handleChange('teamEmail', e.target.value)}
                className={`w-full bg-white/5 border ${errors.teamEmail ? 'border-red' : 'border-white/10'} rounded-lg px-4 py-3 outline-none focus:border-blue/50`}
                placeholder="contact@example.com"
              />
              {errors.teamEmail && <p className="text-red text-sm mt-1">{errors.teamEmail}</p>}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Review Your Submission</h2>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Project Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Name:</div>
                  <div>{formData.projectName}</div>
                  <div className="text-gray-400">Ticker:</div>
                  <div>{formData.ticker}</div>
                  <div className="text-gray-400">Category:</div>
                  <div>{formData.category}</div>
                  <div className="text-gray-400">Chain:</div>
                  <div>{formData.chain}</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Token Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Price:</div>
                  <div>${formData.tokenPrice}</div>
                  <div className="text-gray-400">Total Supply:</div>
                  <div>{formData.totalSupply}</div>
                  <div className="text-gray-400">Target Raise:</div>
                  <div>${formData.targetRaise}</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Tokenomics</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Team:</div>
                  <div>{formData.teamAllocation}%</div>
                  <div className="text-gray-400">Investors:</div>
                  <div>{formData.investorAllocation}%</div>
                  <div className="text-gray-400">Community:</div>
                  <div>{formData.communityAllocation}%</div>
                  <div className="text-gray-400">Liquidity:</div>
                  <div>{formData.liquidityAllocation}%</div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Links & Team</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Website:</div>
                  <div>{formData.website}</div>
                  <div className="text-gray-400">Team:</div>
                  <div>{formData.teamName}</div>
                  <div className="text-gray-400">Email:</div>
                  <div>{formData.teamEmail}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary"
            >
              Submit Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Submit;
