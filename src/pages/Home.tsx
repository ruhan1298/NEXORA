import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Users, TrendingUp, Zap, Clock, CheckCircle, Network, Shield, Target, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard, Button, AnimatedCounter, GradientBorder, TiltCard } from '../components/ui';
import { mockProjects, mockTokens, mockStats } from '../data';

const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24 pb-20"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
                  <span className="text-text-primary">Launch Tokens.</span>{' '}
                  <span className="text-gradient">Build Networks.</span>{' '}
                  <span className="text-text-primary">Explore Web3.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-text-secondary max-w-xl"
              >
                The next-generation ecosystem for token launches, MLM project management, community growth and digital asset discovery.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/launchpad">
                  <Button size="lg" icon={<Rocket className="w-5 h-5" />}>
                    Explore Projects
                  </Button>
                </Link>
                <Link to="/submit">
                  <GradientBorder>
                    <Button variant="secondary" size="lg">
                      Launch Your Project
                    </Button>
                  </GradientBorder>
                </Link>
                <Link to="/community">
                  <Button variant="ghost" size="lg" icon={<Users className="w-5 h-5" />}>
                    Join Referral Program
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-6 text-sm text-text-muted"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Audited Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-cyan" />
                  <span>Secure Launchpad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary-purple" />
                  <span>Instant Trading</span>
                </div>
              </motion.div>
            </div>

            {/* Animated Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <GlassCard className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-text-muted font-mono">NEXORA Dashboard</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-text-muted text-xs mb-1">Portfolio Value</div>
                      <div className="text-2xl font-display font-bold text-gradient">$24,580</div>
                      <div className="text-success text-xs">+12.4%</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-text-muted text-xs mb-1">24h Volume</div>
                      <div className="text-2xl font-display font-bold">$3.2M</div>
                      <div className="text-success text-xs">+8.2%</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 h-32 flex items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-primary-blue to-primary-cyan rounded-t"
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    {mockTokens.slice(0, 3).map((token) => (
                      <div key={token.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{token.logo}</span>
                          <div>
                            <div className="font-medium text-sm">{token.symbol}</div>
                            <div className="text-xs text-text-muted">{token.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-sm">${token.price.toFixed(4)}</div>
                          <div className={`text-xs ${token.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-8 -right-8 glass-card p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-cyan to-primary-blue flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">Trending</div>
                      <div className="font-bold text-success">+156%</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -left-6 glass-card p-4"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-purple to-primary-magenta flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">Community</div>
                      <div className="font-bold">45,230</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Strip */}
      <motion.section variants={itemVariants}>
        <GlassCard className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gradient mb-2">
                <AnimatedCounter end={mockStats.totalProjects} prefix="" suffix="" />
              </div>
              <div className="text-text-secondary text-sm">Total Listed Projects</div>
              <div className="text-xs text-text-muted mt-1">Sample Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gradient mb-2">
                <AnimatedCounter end={mockStats.upcomingLaunches} prefix="" suffix="" />
              </div>
              <div className="text-text-secondary text-sm">Upcoming Launches</div>
              <div className="text-xs text-text-muted mt-1">Sample Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gradient mb-2">
                <AnimatedCounter end={mockStats.listedTokens} prefix="" suffix="" />
              </div>
              <div className="text-text-secondary text-sm">Listed Tokens</div>
              <div className="text-xs text-text-muted mt-1">Sample Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-gradient mb-2">
                <AnimatedCounter end={mockStats.communityMembers} prefix="" suffix="" />
              </div>
              <div className="text-text-secondary text-sm">Community Members</div>
              <div className="text-xs text-text-muted mt-1">Sample Data</div>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* Featured Projects */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Featured Projects</h2>
            <p className="text-text-secondary">Discover the hottest token launches on NEXORA</p>
          </div>
          <Link to="/launchpad" className="hidden md:flex items-center gap-2 text-primary-cyan hover:text-primary-blue transition-colors">
            View All Projects <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.slice(0, 3).map((project) => (
            <TiltCard key={project.id}>
              <Link to={`/launchpad/${project.id}`}>
                <GlassCard className="h-full hover:border-primary-blue/30 transition-all">
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue to-primary-purple flex items-center justify-center text-2xl">
                          {project.logo}
                        </div>
                        <div>
                          <h3 className="font-display font-bold">{project.name}</h3>
                          <div className="text-sm text-text-muted">{project.symbol}</div>
                        </div>
                      </div>
                      <span className={`badge ${
                        project.status === 'live' ? 'badge-success' :
                        project.status === 'upcoming' ? 'badge-warning' :
                        'badge-primary'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-2">{project.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Progress</span>
                        <span className="font-mono">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-gradient-to-r from-primary-cyan to-primary-purple"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-sm text-text-muted">
                        <span className="text-text-primary font-mono">${(project.raised / 1000).toFixed(0)}K</span> raised
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Network className="w-4 h-4" />
                        {project.network}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </TiltCard>
          ))}
        </div>

        <div className="md:hidden text-center">
          <Link to="/launchpad" className="text-primary-cyan hover:text-primary-blue transition-colors">
            View All Projects <ChevronRight className="w-4 h-4 inline" />
          </Link>
        </div>
      </motion.section>

      {/* Upcoming Launches */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold mb-2">Upcoming Launches</h2>
            <p className="text-text-secondary">Don't miss the next big opportunity</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mockProjects.filter(p => p.status === 'upcoming').slice(0, 2).map((project) => (
            <GlassCard key={project.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-purple to-primary-magenta flex items-center justify-center text-3xl flex-shrink-0">
                  {project.logo}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-lg">{project.name}</h3>
                    <div className="text-sm text-text-muted">{project.symbol} • {project.network}</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <Clock className="w-4 h-4" />
                      <span>{project.launchDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted">
                      <Target className="w-4 h-4" />
                      <span>${(project.target / 1000).toFixed(0)}K target</span>
                    </div>
                  </div>
                  <Link to={`/launchpad/${project.id}`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Set Reminder
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* MLM Ecosystem Features */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold mb-2">MLM Ecosystem Features</h2>
          <p className="text-text-secondary">Powerful tools for community-driven growth</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Network, title: 'Multi-Level Referrals', desc: 'Build your network with flexible commission structures' },
            { icon: Target, title: 'Smart Commission Rules', desc: 'Configurable rewards based on verified platform revenue' },
            { icon: Shield, title: 'Secure & Compliant', desc: 'Built-in safeguards and transparent tracking' },
            { icon: Sparkles, title: 'Real-Time Analytics', desc: 'Track your referrals and earnings in real-time' },
            { icon: Users, title: 'Team Management', desc: 'Organize and manage your referral teams efficiently' },
            { icon: Zap, title: 'Instant Payouts', desc: 'Automated commission distribution to eligible members' },
          ].map((feature, i) => (
            <GlassCard key={i} className="p-6 hover:border-primary-blue/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-cyan" />
              </div>
              <h3 className="font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold mb-2">How It Works</h2>
          <p className="text-text-secondary">Get started in 4 simple steps</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Create Account', desc: 'Sign up and connect your wallet' },
            { step: '02', title: 'Explore Projects', desc: 'Browse upcoming token launches' },
            { step: '03', title: 'Participate', desc: 'Join launches and build your portfolio' },
            { step: '04', title: 'Earn Rewards', desc: 'Refer projects and earn commissions' },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="glass-card p-6 h-full">
                <div className="text-4xl font-display font-bold text-gradient mb-4 opacity-50">{item.step}</div>
                <h3 className="font-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary-purple">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section variants={itemVariants} className="relative">
        <div className="aurora-bg rounded-3xl p-12 md:p-20 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to <span className="text-gradient">Launch</span> Your Vision?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of projects building the future of Web3 on NEXORA
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/submit">
              <Button size="lg" icon={<Rocket className="w-5 h-5" />}>
                Launch Your Project
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="secondary" size="lg" icon={<Users className="w-5 h-5" />}>
                Join Referral Program
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
