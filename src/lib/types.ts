export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  liquidity: number;
  category: string;
  icon?: string;
  sparkline?: number[];
}

export interface Project {
  id: string;
  name: string;
  ticker: string;
  category: string;
  tagline: string;
  chain: string;
  raised: number;
  target: number;
  participants: number;
  status: 'upcoming' | 'live' | 'completed';
  startTime?: Date;
  endTime?: Date;
  banner?: string;
  verified: boolean;
  roi?: number;
  description?: string;
}

export interface User {
  id: string;
  address: string;
  balance: number;
  portfolio: Record<string, number>;
  watchlist: string[];
  referrals: number;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  token: string;
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
}

export interface Order {
  id: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit';
  token: string;
  amount: number;
  price?: number;
  status: 'open' | 'filled' | 'cancelled';
  timestamp: Date;
}

export interface Referral {
  id: string;
  name: string;
  joinDate: Date;
  status: 'active' | 'inactive';
  level: number;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  value: number;
  change?: number;
}
