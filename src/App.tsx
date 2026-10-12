import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Launchpad from './pages/Launchpad';
import Tokens from './pages/Tokens';
import TokenDetails from './pages/TokenDetails';
import Trade from './pages/Trade';
import Portfolio from './pages/Portfolio';
import Community from './pages/Community';
import Leaderboard from './pages/Leaderboard';
import Submit from './pages/Submit';
import Admin from './pages/Admin';
import Discovery from './pages/Discovery';
import MLMBuilder from './pages/MLMBuilder';
import About from './pages/About';
import Documentation from './pages/Documentation';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RiskDisclosure from './pages/RiskDisclosure';
import NotFound from './pages/NotFound';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/launchpad" element={<AppLayout><Launchpad /></AppLayout>} />
          <Route path="/launchpad/:id" element={<AppLayout><Launchpad /></AppLayout>} />
          <Route path="/tokens" element={<AppLayout><Tokens /></AppLayout>} />
          <Route path="/tokens/:symbol" element={<AppLayout><TokenDetails /></AppLayout>} />
          <Route path="/trade" element={<AppLayout><Trade /></AppLayout>} />
          <Route path="/portfolio" element={<AppLayout><Portfolio /></AppLayout>} />
          <Route path="/community" element={<AppLayout><Community /></AppLayout>} />
          <Route path="/leaderboard" element={<AppLayout><Leaderboard /></AppLayout>} />
          <Route path="/submit" element={<AppLayout><Submit /></AppLayout>} />
          <Route path="/admin" element={<AppLayout><Admin /></AppLayout>} />
          <Route path="/discovery" element={<AppLayout><Discovery /></AppLayout>} />
          <Route path="/mlm-builder" element={<AppLayout><MLMBuilder /></AppLayout>} />
          <Route path="/about" element={<AppLayout><About /></AppLayout>} />
          <Route path="/documentation" element={<AppLayout><Documentation /></AppLayout>} />
          <Route path="/terms" element={<AppLayout><Terms /></AppLayout>} />
          <Route path="/privacy" element={<AppLayout><Privacy /></AppLayout>} />
          <Route path="/risk-disclosure" element={<AppLayout><RiskDisclosure /></AppLayout>} />
          <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
