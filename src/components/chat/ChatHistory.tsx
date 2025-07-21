import { useState, useEffect } from 'react';
import { Search, MessageSquare, Clock, Trash2, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messageCount: number;
  isStarred: boolean;
  tags: string[];
}

interface ChatHistoryProps {
  onSelectSession?: (sessionId: string) => void;
  currentSessionId?: string;
}

export function ChatHistory({ onSelectSession, currentSessionId }: ChatHistoryProps) {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'API Documentation Review',
      preview: 'How do I implement OAuth authentication according to our guidelines?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      messageCount: 8,
      isStarred: true,
      tags: ['api', 'auth']
    },
    {
      id: '2',
      title: 'Database Migration Process',
      preview: 'What are the steps for migrating to the new database schema?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      messageCount: 12,
      isStarred: false,
      tags: ['database', 'migration']
    },
    {
      id: '3',
      title: 'Frontend Components Guide',
      preview: 'Where can I find the design system components documentation?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      messageCount: 5,
      isStarred: true,
      tags: ['frontend', 'design']
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSessions(sessions);
      return;
    }

    const filtered = sessions.filter(session =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredSessions(filtered);
  }, [searchQuery, sessions]);

  const toggleStar = (sessionId: string) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, isStarred: !session.isStarred }
          : session
      )
    );
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
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
    <div className="h-full flex flex-col bg-card/30 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Chat History
        </h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="pl-10 bg-background/50 border-border/50"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredSessions.map((session) => (
            <Card
              key={session.id}
              className={cn(
                "p-3 cursor-pointer transition-all duration-200 hover:shadow-md group",
                "bg-background/50 hover:bg-background/80 border-border/30",
                currentSessionId === session.id && "bg-primary/10 border-primary/30"
              )}
              onClick={() => onSelectSession?.(session.id)}
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm text-card-foreground line-clamp-1">
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(session.id);
                      }}
                    >
                      <Star
                        className={cn(
                          "w-3 h-3",
                          session.isStarred 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-muted-foreground"
                        )}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Preview */}
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {session.preview}
                </p>

                {/* Tags */}
                {session.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {session.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs px-2 py-0.5 bg-muted/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(session.timestamp)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {session.messageCount}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-border/30">
        <Button 
          variant="ai" 
          className="w-full"
          onClick={() => onSelectSession?.('new')}
        >
          <MessageSquare className="w-4 h-4" />
          New Chat
        </Button>
      </div>
    </div>
  );
}