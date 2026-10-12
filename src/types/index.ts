export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  network: string;
  logo: string;
  project: string;
}

export interface Project {
  id: string;
  name: string;
  logo: string;
  symbol: string;
  network: string;
  supply: number;
  launchDate: string;
  status: 'upcoming' | 'live' | 'completed';
  tokenomics: string;
  mlmPlanType: string;
  referralLevels: number;
  progress: number;
  description: string;
  website?: string;
  contractAddress?: string;
  auditStatus?: 'verified' | 'pending' | 'unverified';
}

export interface MLMPlan {
  directReferral: boolean;
  directPercentage: number;
  multiLevel: boolean;
  levels: number;
  levelPercentages: number[];
  binary: boolean;
  binaryRatio: string;
  levelRewards: boolean;
  royalty: boolean;
  royaltyPercentage: number;
  tokenRewards: boolean;
  staking: boolean;
  stakingAPY: number;
}

export interface ReferralStats {
  totalReferred: number;
  approved: number;
  pending: number;
  earnedCommission: number;
  pendingCommission: number;
  conversionRate: number;
  referralLink: string;
}

export interface WalletState {
  connected: boolean;
  address: string;
  balance: number;
  provider: 'metamask' | 'walletconnect' | 'demo' | null;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  amount: number;
  price: number;
  total: number;
  timestamp: string;
}
