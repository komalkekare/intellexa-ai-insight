import { useState } from 'react';
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { ChatHistory } from '@/components/chat/ChatHistory';
import { Brain, MessageSquare, TrendingUp, FileText, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: 'chat' | 'changes' | 'documents';
  onViewChange: (view: 'chat' | 'changes' | 'documents') => void;
  onSessionSelect?: (sessionId: string) => void;
}

const navigationItems = [
  { id: 'chat', label: 'Chat', icon: MessageSquare, badge: null },
  { id: 'changes', label: 'Recent Changes', icon: TrendingUp, badge: '4' },
  { id: 'documents', label: 'Documents', icon: FileText, badge: null },
];

export function AppLayout({ children, currentView, onViewChange, onSessionSelect }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-ai-secondary">
        {/* Main Sidebar */}
        <Sidebar className="border-r border-border/30">
          <SidebarContent className="bg-card/30 backdrop-blur-md">
            {/* Header */}
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-ai-gradient flex items-center justify-center animate-glow">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-ai-gradient bg-clip-text text-transparent">
                    Intellexa AI
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Intelligent Document Assistant
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "transition-all duration-200",
                          currentView === item.id && "bg-primary/10 text-primary border-r-2 border-primary"
                        )}
                      >
                        <button
                          onClick={() => onViewChange(item.id as any)}
                          className="flex items-center gap-3 w-full p-3"
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Features Section */}
            <SidebarGroup>
              <div className="px-4 py-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Features</h3>
              </div>
              <SidebarGroupContent>
                <div className="px-4 space-y-2">
                  <Button variant="glass" size="sm" className="w-full justify-start">
                    <Zap className="w-4 h-4" />
                    Smart Suggestions
                  </Button>
                  <Button variant="glass" size="sm" className="w-full justify-start">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Chat History (only show when on chat view) */}
            {currentView === 'chat' && (
              <div className="flex-1 mt-4">
                <ChatHistory onSelectSession={onSessionSelect} />
              </div>
            )}
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-14 border-b border-border/30 bg-card/30 backdrop-blur-md flex items-center px-4">
            <SidebarTrigger />
            <div className="ml-4">
              <h2 className="font-semibold capitalize">
                {currentView === 'chat' ? 'AI Assistant' : 
                 currentView === 'changes' ? 'Recent Changes' : 
                 'Document Library'}
              </h2>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}