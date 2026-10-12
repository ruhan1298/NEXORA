import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { AuroraBackground } from './ui';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AuroraBackground>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

      <Footer />
    </AuroraBackground>
  );
};

export default AppLayout;
