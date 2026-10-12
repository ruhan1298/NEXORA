import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button, GlassCard } from '../components/ui';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <GlassCard className="max-w-2xl w-full p-12 text-center">
        <div className="text-8xl font-display font-bold text-gradient mb-4">404</div>
        <h1 className="text-3xl font-display font-bold mb-4">Page Not Found</h1>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button icon={<Home className="w-5 h-5" />}>
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
