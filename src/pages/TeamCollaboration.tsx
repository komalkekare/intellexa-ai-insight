import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, TrendingUp, MessageSquare, ArrowLeft, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamCollaboration = () => {
  const navigate = useNavigate();

  const teamStats = {
    totalQuestions: 2847,
    activeUsers: 47,
    knowledgeGaps: 12,
    popularTopics: 8
  };

  const topQuestions = [
    { question: "How to deploy to production?", count: 23, trend: "+15%" },
    { question: "Authentication setup guide?", count: 19, trend: "+8%" },
    { question: "API rate limiting configuration?", count: 16, trend: "+12%" },
    { question: "Database migration process?", count: 14, trend: "+5%" },
    { question: "Error handling best practices?", count: 11, trend: "+3%" }
  ];

  const activeUsers = [
    { name: "Sarah Chen", initials: "SC", questions: 34, expertise: "Frontend" },
    { name: "Mike Johnson", initials: "MJ", questions: 28, expertise: "Backend" },
    { name: "Elena Rodriguez", initials: "ER", questions: 25, expertise: "DevOps" },
    { name: "Alex Kim", initials: "AK", questions: 22, expertise: "Data" },
    { name: "Jordan Lee", initials: "JL", questions: 19, expertise: "Security" }
  ];

  const knowledgeGaps = [
    { topic: "Microservices Architecture", gap: "High", urgency: "Critical" },
    { topic: "Performance Optimization", gap: "Medium", urgency: "Important" },
    { topic: "Security Protocols", gap: "Low", urgency: "Normal" },
    { topic: "API Documentation", gap: "Medium", urgency: "Important" }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'destructive';
      case 'Important': return 'default';
      case 'Normal': return 'secondary';
      default: return 'outline';
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
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Team Collaboration</h1>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">{teamStats.totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-success mb-2">{teamStats.activeUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-warning mb-2">{teamStats.knowledgeGaps}</div>
            <div className="text-sm text-muted-foreground">Knowledge Gaps</div>
          </Card>
          <Card className="p-6 text-center bg-card/80 backdrop-blur-sm border-border/30">
            <div className="text-3xl font-bold text-info mb-2">{teamStats.popularTopics}</div>
            <div className="text-sm text-muted-foreground">Popular Topics</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Questions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              Most Asked Questions
            </h2>
            
            {topQuestions.map((item, index) => (
              <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.question}</p>
                      <p className="text-sm text-muted-foreground">{item.count} times asked</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-success">
                    {item.trend}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Active Team Members */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Top Contributors
            </h2>
            
            {activeUsers.map((user, index) => (
              <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.expertise} Expert</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">{user.questions}</div>
                    <div className="text-xs text-muted-foreground">questions</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Knowledge Gaps */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-primary" />
            Knowledge Gaps to Address
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {knowledgeGaps.map((gap, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{gap.topic}</h3>
                  <Badge variant={getUrgencyColor(gap.urgency) as any}>
                    {gap.urgency}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Gap Level: <span className="font-medium">{gap.gap}</span>
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Clock className="w-4 h-4" />
                  Create Documentation
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;