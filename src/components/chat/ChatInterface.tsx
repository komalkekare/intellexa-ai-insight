import { useState, useRef, useEffect } from 'react';
import { Send, ThumbsUp, ThumbsDown, Clock, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  sources?: DocumentSource[];
  feedback?: 'positive' | 'negative' | null;
}

interface DocumentSource {
  id: string;
  title: string;
  url: string;
  snippet: string;
  confidence: number;
  platform: 'notion' | 'gdocs' | 'confluence';
}

interface ChatInterfaceProps {
  onNewMessage?: (message: Message) => void;
}

export function ChatInterface({ onNewMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Intellexa AI, your intelligent document assistant. I can help you find answers from your team's documentation across Notion, Google Docs, and Confluence. What would you like to know?",
      timestamp: new Date(),
      sources: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with document sources
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Based on your team's documentation, I found relevant information about this topic. The implementation details are documented in several places with recent updates.",
        timestamp: new Date(),
        sources: [
          {
            id: '1',
            title: 'API Integration Guidelines',
            url: '#',
            snippet: 'The authentication flow should follow OAuth 2.0 standards...',
            confidence: 0.95,
            platform: 'notion'
          },
          {
            id: '2',
            title: 'Development Best Practices',
            url: '#',
            snippet: 'When implementing new features, ensure proper error handling...',
            confidence: 0.88,
            platform: 'confluence'
          }
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      onNewMessage?.(aiMessage);
    }, 2000);
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );

    if (feedback === 'positive') {
      toast({
        title: "Thank you for your feedback!",
        description: "Your positive feedback helps improve Intellexa AI.",
        duration: 3000,
      });
    }
  };

  const getPlatformIcon = (platform: DocumentSource['platform']) => {
    switch (platform) {
      case 'notion': return '📝';
      case 'gdocs': return '📄';
      case 'confluence': return '🏢';
      default: return '📋';
    }
  };

  return (
    <div className="flex flex-col h-full bg-ai-secondary">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 animate-fade-slide-up",
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                "max-w-3xl",
                message.type === 'user' 
                  ? 'order-2' 
                  : 'order-1'
              )}
            >
              {/* Message bubble */}
              <Card
                className={cn(
                  "p-4 shadow-glass backdrop-blur-sm",
                  message.type === 'user'
                    ? 'bg-chat-user/10 border-chat-user/20'
                    : 'bg-card/80 border-border/50'
                )}
              >
                <div className="prose prose-sm max-w-none">
                  <p className="mb-2 text-card-foreground">{message.content}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {/* Sources */}
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Sources
                    </h4>
                    {message.sources.map((source) => (
                      <Card
                        key={source.id}
                        className="p-3 bg-muted/30 border-border/30 hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{getPlatformIcon(source.platform)}</span>
                              <span className="text-sm font-medium text-card-foreground">
                                {source.title}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {Math.round(source.confidence * 100)}% match
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              "{source.snippet}"
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Feedback buttons */}
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/30">
                    <Button
                      variant={message.feedback === 'positive' ? 'feedback' : 'ghost'}
                      size="sm"
                      onClick={() => handleFeedback(message.id, 'positive')}
                      className={cn(
                        "transition-all duration-200",
                        message.feedback === 'positive' && "animate-success-bounce"
                      )}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant={message.feedback === 'negative' ? 'destructive' : 'ghost'}
                      size="sm"
                      onClick={() => handleFeedback(message.id, 'negative')}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                message.type === 'user'
                  ? 'order-1 bg-chat-user/20 text-chat-user'
                  : 'order-2 bg-ai-gradient text-primary-foreground animate-ai-pulse'
              )}
            >
              {message.type === 'user' ? 'You' : 'AI'}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-slide-up">
            <div className="w-8 h-8 rounded-full bg-ai-gradient text-primary-foreground flex items-center justify-center text-sm font-medium animate-ai-pulse">
              AI
            </div>
            <Card className="p-4 bg-card/80 border-border/50 shadow-glass backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                </div>
                <span className="text-sm text-muted-foreground">Intellexa is thinking...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border/30 bg-card/50 backdrop-blur-md">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your documentation..."
              className="resize-none bg-background/80 border-border/50 focus:border-primary/50 transition-colors"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            variant="ai"
            size="chat"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}