import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, FileText, Users, Zap, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 'ai-insights',
      title: 'AI-Powered Insights',
      description: 'Get intelligent answers from your team\'s documentation with confidence scoring.',
      icon: Brain,
      path: '/ai-insights'
    },
    {
      id: 'source-tracking',
      title: 'Source Tracking',
      description: 'See exactly where information comes from with highlighted document previews.',
      icon: FileText,
      path: '/source-tracking'
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration',
      description: 'Track knowledge gaps and popular questions across your team.',
      icon: Users,
      path: '/team-collaboration'
    },
    {
      id: 'real-time-updates',
      title: 'Real-time Updates',
      description: 'Get notified when your documentation changes and ask about recent updates.',
      icon: Zap,
      path: '/real-time-updates'
    },
    {
      id: 'enterprise-security',
      title: 'Enterprise Security',
      description: 'Your data stays secure with advanced encryption and access controls.',
      icon: Shield,
      path: '/enterprise-security'
    }
  ];

  return (
    <div className="min-h-screen bg-ai-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* Logo & Title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-ai-gradient flex items-center justify-center animate-glow">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-ai-gradient bg-clip-text text-transparent">
              Intellexa AI
            </h1>
          </div>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your intelligent documentation assistant. Get instant answers from your 
            team's knowledge base with AI-powered insights and source tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <Button 
              variant="ai" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => navigate('/chat')}
            >
              <Sparkles className="w-5 h-5" />
              Start Chatting
            </Button>
            <Button 
              variant="glass" 
              size="lg" 
              className="text-lg px-8"
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card 
                key={feature.id}
                className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(feature.path)}
              >
                <div className="w-12 h-12 bg-ai-gradient rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;