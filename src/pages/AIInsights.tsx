import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, TrendingUp, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIInsights = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [insights, setInsights] = useState<any[]>([]);

  const dummyInsights = [
    {
      id: 1,
      question: "How do I integrate the payment gateway?",
      answer: "To integrate the payment gateway, you need to configure the API keys in the environment variables and implement the webhook handlers for payment confirmations.",
      confidence: 95,
      sources: ["Payment Integration Guide", "API Documentation"],
      category: "Integration",
      popularity: 89
    },
    {
      id: 2,
      question: "What's the authentication flow?",
      answer: "Our authentication uses JWT tokens with refresh token rotation. Users authenticate via OAuth2 providers or email/password, receiving access tokens valid for 15 minutes.",
      confidence: 92,
      sources: ["Authentication Guide", "Security Documentation"],
      category: "Security",
      popularity: 76
    },
    {
      id: 3,
      question: "How to deploy to production?",
      answer: "Production deployment involves building the Docker container, pushing to registry, and updating the Kubernetes manifests. Follow the CI/CD pipeline for automated deployments.",
      confidence: 88,
      sources: ["Deployment Guide", "DevOps Documentation"],
      category: "DevOps",
      popularity: 65
    }
  ];

  const handleSearch = () => {
    if (query.trim()) {
      setInsights(dummyInsights);
    }
  };

  return (
    <div className="min-h-screen bg-ai-secondary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ai-gradient rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">AI-Powered Insights</h1>
          </div>
        </div>

        {/* Search Section */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-border/30">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Ask anything about your documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg h-12"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button variant="ai" size="lg" onClick={handleSearch}>
              <Search className="w-5 h-5" />
              Get Insights
            </Button>
          </div>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">1,247</div>
            <div className="text-sm text-muted-foreground">Documents Analyzed</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-success mb-2">96.8%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-info mb-2">2.3s</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-warning mb-2">15,892</div>
            <div className="text-sm text-muted-foreground">Insights Generated</div>
          </Card>
        </div>

        {/* Insights Results */}
        {insights.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Smart Insights
            </h2>
            
            {insights.map((insight) => (
              <Card key={insight.id} className="p-6 bg-card/80 backdrop-blur-sm border-border/30">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">{insight.question}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {insight.confidence}% confidence
                    </Badge>
                    <Badge variant="outline">
                      {insight.popularity}% popularity
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {insight.answer}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Sources: {insight.sources.join(', ')}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {insight.category}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {insights.length === 0 && (
          <Card className="p-12 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Provide Insights</h3>
            <p className="text-muted-foreground">
              Ask any question about your documentation and get AI-powered insights with confidence scores.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIInsights;