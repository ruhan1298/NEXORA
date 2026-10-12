import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Launchpad from './pages/Launchpad';
import Explore from './pages/Explore';
import TokenDetails from './pages/TokenDetails';
import ProjectDetails from './pages/ProjectDetails';
import MLMCommunity from './pages/MLMCommunity';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import SubmitProject from './pages/SubmitProject';
import Trading from './pages/Trading';
import Admin from './pages/Admin';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-navy-800">
          <Navigation />
          <main className="md:ml-64 pt-16 md:pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/discover" element={<Explore />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/token/:id" element={<TokenDetails />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/mlm-community" element={<MLMCommunity />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/submit" element={<SubmitProject />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
