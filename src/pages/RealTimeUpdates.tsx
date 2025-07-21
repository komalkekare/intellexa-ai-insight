import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Zap, Bell, ArrowLeft, Clock, FileEdit, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RealTimeUpdates = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [slackIntegration, setSlackIntegration] = useState(true);

  const recentUpdates = [
    {
      id: 1,
      title: "API Authentication Guide Updated",
      description: "Added new OAuth2 provider configurations and security best practices",
      platform: "Notion",
      timestamp: "2 minutes ago",
      type: "update",
      author: "Sarah Chen",
      impact: "High"
    },
    {
      id: 2,
      title: "Payment Integration Documentation",
      description: "New webhook endpoints and error handling procedures added",
      platform: "Google Docs",
      timestamp: "15 minutes ago",
      type: "new",
      author: "Mike Johnson",
      impact: "Medium"
    },
    {
      id: 3,
      title: "Deployment Best Practices",
      description: "Updated CI/CD pipeline configuration and rollback procedures",
      platform: "Confluence",
      timestamp: "1 hour ago",
      type: "update",
      author: "Elena Rodriguez",
      impact: "High"
    },
    {
      id: 4,
      title: "Database Migration Guide",
      description: "Deprecated old migration scripts, added new automated tools",
      platform: "Notion",
      timestamp: "3 hours ago",
      type: "deprecation",
      author: "Alex Kim",
      impact: "Critical"
    }
  ];

  const upcomingChanges = [
    {
      title: "Security Protocol Updates",
      scheduledFor: "Tomorrow, 2:00 PM",
      description: "New encryption standards and access control policies",
      impact: "Critical"
    },
    {
      title: "API Rate Limiting Changes",
      scheduledFor: "Dec 28, 10:00 AM",
      description: "Updated rate limits for better performance",
      impact: "Medium"
    },
    {
      title: "Mobile SDK Documentation",
      scheduledFor: "Jan 2, 9:00 AM",
      description: "Complete overhaul of mobile development guides",
      impact: "High"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'new': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'update': return <FileEdit className="w-4 h-4 text-info" />;
      case 'deprecation': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  };

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
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Real-time Updates</h1>
          </div>
        </div>

        {/* Notification Settings */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-border/30">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notification Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">Get instant alerts</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Alerts</h3>
                <p className="text-sm text-muted-foreground">Daily digest emails</p>
              </div>
              <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Slack Integration</h3>
                <p className="text-sm text-muted-foreground">Team channel updates</p>
              </div>
              <Switch checked={slackIntegration} onCheckedChange={setSlackIntegration} />
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">47</div>
            <div className="text-sm text-muted-foreground">Updates Today</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-success mb-2">12</div>
            <div className="text-sm text-muted-foreground">New Documents</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-warning mb-2">3</div>
            <div className="text-sm text-muted-foreground">Critical Changes</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-info mb-2">89%</div>
            <div className="text-sm text-muted-foreground">Coverage Rate</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Updates */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Recent Changes
            </h2>
            
            <div className="space-y-4">
              {recentUpdates.map((update) => (
                <Card key={update.id} className="p-4 bg-card/80 backdrop-blur-sm border-border/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(update.type)}
                      <div className={`w-2 h-2 rounded-full ${getPlatformColor(update.platform)}`} />
                      <span className="text-sm text-muted-foreground">{update.platform}</span>
                    </div>
                    <Badge variant={getImpactColor(update.impact) as any}>
                      {update.impact}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{update.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {update.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>By {update.author}</span>
                    <span>{update.timestamp}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Changes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" />
              Scheduled Updates
            </h2>
            
            <div className="space-y-4">
              {upcomingChanges.map((change, index) => (
                <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/30">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{change.title}</h3>
                    <Badge variant={getImpactColor(change.impact) as any}>
                      {change.impact}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {change.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Scheduled for:</span>
                    <span className="font-medium">{change.scheduledFor}</span>
                  </div>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full">
                View All Scheduled Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeUpdates;