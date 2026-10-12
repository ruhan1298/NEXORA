# NEXORA - Premium Web3 Launchpad & Token Trading Platform

A production-quality, premium Web3 Launchpad and Token Trading platform built with React 18, TypeScript, Vite, and Tailwind CSS. Features a modern dark theme design with animated components, real-time simulated trading, portfolio management, and an MLM referral system.

## 🚀 Features

- **Launchpad**: Browse upcoming, live, and completed IDO projects with filtering and sorting
- **Token Trading**: Real-time simulated trading terminal with order book and price charts
- **Portfolio Management**: Track holdings, watchlist, and transaction history
- **MLM Referral System**: Multi-level referral dashboard with rewards tiers
- **Leaderboard**: Top traders, referrers, and investors rankings
- **Admin Console**: Project submission review and user management
- **Responsive Design**: Mobile-first with slide-in sidebar navigation
- **Premium UI**: Dark theme with gradient accents, glowing effects, and smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **State Management**: Zustand (with persistence)
- **Context**: React Context for wallet state

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Running on Replit

This project is configured to work on Replit out of the box:

1. Import the project into Replit
2. The `.replit` file will automatically run `npm run dev`
3. The server binds to `0.0.0.0:5173` with `allowedHosts: true` configured in `vite.config.ts`

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── AppLayout.tsx
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── ConnectWalletModal.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Launchpad.tsx
│   ├── Tokens.tsx
│   ├── TokenDetails.tsx
│   ├── Trade.tsx
│   ├── Portfolio.tsx
│   ├── Community.tsx
│   ├── Leaderboard.tsx
│   ├── Submit.tsx
│   └── Admin.tsx
├── data/            # Mock data
│   ├── tokens.ts
│   └── projects.ts
├── context/         # React Context
│   └── WalletContext.tsx
├── lib/             # Utilities and types
│   ├── types.ts
│   └── store.ts
└── hooks/           # Custom hooks
```

## 🎨 Design System

- **Background**: Near-black navy (#050810 / #0A0F1E)
- **Cards**: #0D1424 with 1px borders rgba(255,255,255,0.06)
- **Accents**: Electric blue (#3B82F6) and purple (#8B5CF6)
- **Positive**: Green (#22C55E)
- **Negative**: Red (#EF4444)
- **Font**: Inter / Space Grotesk
- **Animations**: Framer Motion for smooth transitions

## 🔐 Important Notes

- **Demo Only**: All trading, wallet connections, and transactions are simulated
- **No Real Blockchain**: No actual blockchain calls or real money transactions
- **Mock Data**: All data is fictional and stored in memory/localStorage
- **Educational Purpose**: This is a frontend demo for portfolio/educational use

## 📄 Pages Overview

1. **Home/Overview**: Hero section, stats, featured projects, token discovery table
2. **Launchpad**: Project listings with tabs (Upcoming/Live/Completed), filters, and progress tracking
3. **Explore Tokens**: Full token table with sorting, filtering, search, and sparkline charts
4. **Token Details**: Price charts, tokenomics donut chart, about section, and trade buttons
5. **Trading Terminal**: Simulated live trading with order book, recent trades, and order placement
6. **Portfolio**: Holdings, watchlist, transaction history, and balance charts
7. **Community**: MLM referral dashboard with team tree, rewards tiers, and earnings
8. **Leaderboard**: Rankings for traders, referrers, and investors with podium display
9. **Submit Project**: Multi-step form for project submission with validation
10. **Admin Console**: Project approval workflow, user management, and system status

## 🧪 Testing

Currently, this project does not include automated tests. All features are manually tested through the development server.

## 📝 License

This project is for educational and demonstration purposes only.

## 🤝 Contributing

This is a demo project. Feel free to fork and modify for your own use cases.
