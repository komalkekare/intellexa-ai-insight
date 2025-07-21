import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { RecentChanges } from '@/components/features/RecentChanges';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Link2, Database } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'chat' | 'changes' | 'documents'>('chat');
  const [currentSession, setCurrentSession] = useState<string>('1');

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSession(sessionId);
    // Here you would load the selected chat session
  };

  const handleNewMessage = (message: any) => {
    // Handle new messages for chat history
    console.log('New message:', message);
  };

  const renderDocuments = () => (
    <div className="p-6 space-y-6">
      {/* Document Ingestion Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-ai-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Notion Integration</h3>
          <p className="text-sm text-muted-foreground mb-4">Connect your Notion workspace</p>
          <Button variant="ai" size="sm">
            <Link2 className="w-4 h-4" />
            Connect
          </Button>
        </Card>

        <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-ai-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Google Docs</h3>
          <p className="text-sm text-muted-foreground mb-4">Import from Google Drive</p>
          <Button variant="ai" size="sm">
            <Link2 className="w-4 h-4" />
            Connect
          </Button>
        </Card>

        <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-ai-gradient rounded-lg mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Confluence</h3>
          <p className="text-sm text-muted-foreground mb-4">Sync team documentation</p>
          <Button variant="ai" size="sm">
            <Link2 className="w-4 h-4" />
            Connect
          </Button>
        </Card>
      </div>

      {/* Manual Upload */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/30">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Manual Document Upload
        </h3>
        <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Drag and drop your documents here, or click to browse
          </p>
          <Button variant="outline">
            Choose Files
          </Button>
        </div>
      </Card>

      {/* Vector Store Status */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/30">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          ChromaDB Vector Store
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Documents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">15,892</div>
            <div className="text-sm text-muted-foreground">Chunks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-info">98.2%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">23ms</div>
            <div className="text-sm text-muted-foreground">Avg Query</div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <AppLayout
      currentView={currentView}
      onViewChange={setCurrentView}
      onSessionSelect={handleSessionSelect}
    >
      {currentView === 'chat' && (
        <ChatInterface onNewMessage={handleNewMessage} />
      )}
      {currentView === 'changes' && (
        <div className="p-6">
          <RecentChanges />
        </div>
      )}
      {currentView === 'documents' && renderDocuments()}
    </AppLayout>
  );
};

export default Index;
