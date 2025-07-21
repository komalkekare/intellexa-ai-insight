import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink, ArrowLeft, Search, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SourceTracking = () => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState<any>(null);

  const dummySources = [
    {
      id: 1,
      title: "API Authentication Guide",
      platform: "Notion",
      url: "https://notion.so/auth-guide",
      snippet: "Authentication is handled via JWT tokens. Users must first authenticate using OAuth2 providers or email/password combination. The access token expires after 15 minutes and requires refresh.",
      highlighted: "JWT tokens. Users must first authenticate using OAuth2",
      confidence: 95,
      lastUpdated: "2 hours ago",
      category: "Security"
    },
    {
      id: 2,
      title: "Payment Integration Documentation",
      platform: "Google Docs",
      url: "https://docs.google.com/payment-integration",
      snippet: "To integrate payments, configure the webhook endpoint in your environment variables. The payment gateway supports multiple providers including Stripe, PayPal, and Square.",
      highlighted: "configure the webhook endpoint in your environment variables",
      confidence: 92,
      lastUpdated: "1 day ago",
      category: "Integration"
    },
    {
      id: 3,
      title: "Deployment Best Practices",
      platform: "Confluence",
      url: "https://confluence.atlassian.com/deployment",
      snippet: "Production deployments should follow the blue-green deployment strategy. Always run tests in staging environment before promoting to production. Use feature flags for gradual rollouts.",
      highlighted: "blue-green deployment strategy. Always run tests in staging",
      confidence: 88,
      lastUpdated: "3 days ago",
      category: "DevOps"
    }
  ];

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Notion': return 'bg-blue-500';
      case 'Google Docs': return 'bg-green-500';
      case 'Confluence': return 'bg-purple-500';
      default: return 'bg-gray-500';
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
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Source Tracking</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">1,247</div>
            <div className="text-sm text-muted-foreground">Total Sources</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-success mb-2">523</div>
            <div className="text-sm text-muted-foreground">Notion Pages</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-info mb-2">394</div>
            <div className="text-sm text-muted-foreground">Google Docs</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-warning mb-2">330</div>
            <div className="text-sm text-muted-foreground">Confluence Pages</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sources List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Search className="w-6 h-6 text-primary" />
              Recent Sources
            </h2>
            
            {dummySources.map((source) => (
              <Card 
                key={source.id} 
                className={`p-6 bg-card/80 backdrop-blur-sm border-border/30 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedSource?.id === source.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSource(source)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPlatformColor(source.platform)}`} />
                    <span className="text-sm text-muted-foreground">{source.platform}</span>
                  </div>
                  <Badge variant="outline">
                    {source.confidence}% match
                  </Badge>
                </div>
                
                <h3 className="font-semibold mb-2 text-primary">{source.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {source.snippet}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{source.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    Updated {source.lastUpdated}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Source Preview */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Source Preview
            </h2>
            
            {selectedSource ? (
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${getPlatformColor(selectedSource.platform)}`} />
                    <span className="font-semibold">{selectedSource.platform}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedSource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Open Source
                    </a>
                  </Button>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {selectedSource.title}
                </h3>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Highlighted Excerpt:</h4>
                  <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                    <p className="text-sm">
                      {selectedSource.snippet.replace(
                        selectedSource.highlighted,
                        `<mark class="bg-primary/30 px-1 rounded">${selectedSource.highlighted}</mark>`
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <Badge variant="secondary">{selectedSource.confidence}%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="outline">{selectedSource.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Updated:</span>
                    <span className="text-sm">{selectedSource.lastUpdated}</span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center bg-card/80 backdrop-blur-sm border-border/30">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Source</h3>
                <p className="text-muted-foreground">
                  Click on any source from the list to see its detailed preview with highlighted excerpts.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceTracking;