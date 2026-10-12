import React, { useState } from 'react';
import { ArrowRight, Check, Upload, ChevronRight } from 'lucide-react';

const SubmitProject: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    website: '',
    teamInfo: '',
    tokenName: '',
    tokenSymbol: '',
    blockchain: '',
    totalSupply: '',
    tokenomics: '',
    contractAddress: '',
    mlmPlanType: '',
    referralLevels: '5',
    directPercentage: '10',
  });

  const steps = [
    { id: 1, title: 'Project Info' },
    { id: 2, title: 'Token Info' },
    { id: 3, title: 'MLM Plan' },
    { id: 4, title: 'Review' },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    alert('Project submitted successfully! (Demo submission)');
    setCurrentStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Submit Your Project</h1>
          <p className="text-gray-400 text-lg">
            Launch your token with configurable MLM compensation plans
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                currentStep >= step.id
                  ? 'bg-gradient-to-r from-electric-blue to-electric-purple text-white'
                  : 'bg-navy-800 text-gray-400'
              }`}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <div className="ml-3 hidden md:block">
                <div className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.title}
                </div>
              </div>
              {step.id < 4 && (
                <ChevronRight className="w-5 h-5 text-gray-600 mx-2 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Project Information */}
        {currentStep === 1 && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Project Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Describe your project"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website *</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="https://yourproject.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Information *</label>
                <textarea
                  name="teamInfo"
                  value={formData.teamInfo}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Tell us about your team"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Logo</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-electric-blue transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={handleNext} className="btn-primary flex items-center space-x-2">
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Token Information */}
        {currentStep === 2 && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Token Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Name *</label>
                  <input
                    type="text"
                    name="tokenName"
                    value={formData.tokenName}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                    placeholder="My Token"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol *</label>
                  <input
                    type="text"
                    name="tokenSymbol"
                    value={formData.tokenSymbol}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                    placeholder="MTK"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Blockchain Network *</label>
                <select
                  name="blockchain"
                  value={formData.blockchain}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                >
                  <option value="">Select network</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="BSC">BSC</option>
                  <option value="Polygon">Polygon</option>
                  <option value="Avalanche">Avalanche</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Supply *</label>
                <input
                  type="number"
                  name="totalSupply"
                  value={formData.totalSupply}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="1000000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tokenomics *</label>
                <textarea
                  name="tokenomics"
                  value={formData.tokenomics}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="Describe your token distribution"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Contract Address (if deployed)</label>
                <input
                  type="text"
                  name="contractAddress"
                  value={formData.contractAddress}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  placeholder="0x..."
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="btn-secondary">Back</button>
              <button onClick={handleNext} className="btn-primary flex items-center space-x-2">
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: MLM Plan */}
        {currentStep === 3 && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">MLM Compensation Plan</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">MLM Plan Type *</label>
                <select
                  name="mlmPlanType"
                  value={formData.mlmPlanType}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                >
                  <option value="">Select plan type</option>
                  <option value="direct">Direct Referral Only</option>
                  <option value="multilevel">Multi-Level Referral</option>
                  <option value="binary">Binary Team Structure</option>
                  <option value="level">Level-Based Rewards</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Referral Levels</label>
                <input
                  type="number"
                  name="referralLevels"
                  value={formData.referralLevels}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  min="1"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Direct Referral Commission (%)</label>
                <input
                  type="number"
                  name="directPercentage"
                  value={formData.directPercentage}
                  onChange={handleChange}
                  className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric-blue"
                  min="0"
                  max="100"
                />
              </div>

              <div className="bg-navy-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Additional Modules</h3>
                <div className="space-y-3">
                  {[
                    'Binary Team Structure',
                    'Level-Based Rewards',
                    'Royalty Rules',
                    'Token-Based Rewards',
                    'Staking Module',
                  ].map((module) => (
                    <label key={module} className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-navy-900 text-electric-blue focus:ring-electric-blue" />
                      <span className="text-gray-300">{module}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="btn-secondary">Back</button>
              <button onClick={handleNext} className="btn-primary flex items-center space-x-2">
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Review & Submit</h2>
            <div className="space-y-6">
              <div className="bg-navy-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Project Information</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Name:</strong> {formData.projectName || 'Not provided'}</p>
                  <p><strong>Website:</strong> {formData.website || 'Not provided'}</p>
                  <p><strong>Description:</strong> {formData.description || 'Not provided'}</p>
                </div>
              </div>
              <div className="bg-navy-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Token Information</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Name:</strong> {formData.tokenName || 'Not provided'}</p>
                  <p><strong>Symbol:</strong> {formData.tokenSymbol || 'Not provided'}</p>
                  <p><strong>Network:</strong> {formData.blockchain || 'Not provided'}</p>
                  <p><strong>Supply:</strong> {formData.totalSupply || 'Not provided'}</p>
                </div>
              </div>
              <div className="bg-navy-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">MLM Plan</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Type:</strong> {formData.mlmPlanType || 'Not provided'}</p>
                  <p><strong>Levels:</strong> {formData.referralLevels}</p>
                  <p><strong>Direct Commission:</strong> {formData.directPercentage}%</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={handleBack} className="btn-secondary">Back</button>
              <button onClick={handleSubmit} className="btn-primary flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Submit Project</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Demo platform - Project submission is simulated. No real deployment or approval process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmitProject;
