import { useState } from 'react';
import { Calendar, FileText, Users, TrendingUp, Filter, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DocumentChange {
  id: string;
  title: string;
  type: 'created' | 'updated' | 'deleted';
  platform: 'notion' | 'gdocs' | 'confluence';
  author: string;
  timestamp: Date;
  summary: string;
  url: string;
  impact: 'low' | 'medium' | 'high';
  categories: string[];
}

const changes: DocumentChange[] = [
  {
    id: '1',
    title: 'API Authentication Guidelines',
    type: 'updated',
    platform: 'notion',
    author: 'Sarah Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    summary: 'Updated OAuth 2.0 implementation details and added new security requirements for API access.',
    url: '#',
    impact: 'high',
    categories: ['security', 'api']
  },
  {
    id: '2',
    title: 'Frontend Component Library v2.0',
    type: 'created',
    platform: 'confluence',
    author: 'Alex Rodriguez',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    summary: 'New comprehensive guide for the updated design system components.',
    url: '#',
    impact: 'high',
    categories: ['frontend', 'design-system']
  },
  {
    id: '3',
    title: 'Database Migration Checklist',
    type: 'updated',
    platform: 'gdocs',
    author: 'Marcus Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    summary: 'Added rollback procedures and updated environment-specific configurations.',
    url: '#',
    impact: 'medium',
    categories: ['database', 'devops']
  },
  {
    id: '4',
    title: 'Deprecated Legacy Endpoints',
    type: 'deleted',
    platform: 'notion',
    author: 'Emily Zhang',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    summary: 'Removed documentation for endpoints that will be sunset in Q2.',
    url: '#',
    impact: 'low',
    categories: ['api', 'deprecation']
  }
];

export function RecentChanges() {
  const [timeFilter, setTimeFilter] = useState('24h');
  const [platformFilter, setPlatformFilter] = useState('all');

  const filteredChanges = changes.filter(change => {
    const timeFilterMatch = (() => {
      const now = Date.now();
      const changeTime = change.timestamp.getTime();
      
      switch (timeFilter) {
        case '1h': return now - changeTime <= 60 * 60 * 1000;
        case '24h': return now - changeTime <= 24 * 60 * 60 * 1000;
        case '7d': return now - changeTime <= 7 * 24 * 60 * 60 * 1000;
        default: return true;
      }
    })();

    const platformMatch = platformFilter === 'all' || change.platform === platformFilter;
    
    return timeFilterMatch && platformMatch;
  });

  const getTypeIcon = (type: DocumentChange['type']) => {
    switch (type) {
      case 'created': return '✨';
      case 'updated': return '📝';
      case 'deleted': return '🗑️';
    }
  };

  const getTypeColor = (type: DocumentChange['type']) => {
    switch (type) {
      case 'created': return 'bg-success/10 text-success border-success/20';
      case 'updated': return 'bg-info/10 text-info border-info/20';
      case 'deleted': return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  const getPlatformIcon = (platform: DocumentChange['platform']) => {
    switch (platform) {
      case 'notion': return '📝';
      case 'gdocs': return '📄';
      case 'confluence': return '🏢';
    }
  };

  const getImpactColor = (impact: DocumentChange['impact']) => {
    switch (impact) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-ai-gradient flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Recent Changes</h2>
            <p className="text-sm text-muted-foreground">
              Stay updated with the latest documentation changes across your team
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-36 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All platforms</SelectItem>
              <SelectItem value="notion">Notion</SelectItem>
              <SelectItem value="gdocs">Google Docs</SelectItem>
              <SelectItem value="confluence">Confluence</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Changes List */}
      <div className="space-y-4">
        {filteredChanges.map((change, index) => (
          <Card
            key={change.id}
            className={cn(
              "p-6 transition-all duration-200 hover:shadow-md animate-fade-slide-up bg-card/80 backdrop-blur-sm border-border/30",
              `animation-delay-${index * 100}`
            )}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-2xl">{getTypeIcon(change.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-card-foreground">{change.title}</h3>
                      <Badge className={getTypeColor(change.type)}>
                        {change.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{change.summary}</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              {/* Categories */}
              {change.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {change.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="text-xs bg-muted/50"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>{getPlatformIcon(change.platform)}</span>
                    <span className="capitalize">{change.platform}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{change.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatTimeAgo(change.timestamp)}</span>
                  </div>
                </div>
                
                <Badge className={getImpactColor(change.impact)}>
                  {change.impact} impact
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredChanges.length === 0 && (
        <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-border/30">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No changes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for updates.
          </p>
        </Card>
      )}
    </div>
  );
}