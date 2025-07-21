import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Lock, Key, UserCheck, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnterpriseSecurity = () => {
  const navigate = useNavigate();

  const securityMetrics = {
    overallScore: 94,
    encryption: 100,
    accessControl: 89,
    compliance: 96,
    monitoring: 91
  };

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest using AES-256",
      status: "Active",
      icon: Lock,
      details: "Military-grade encryption with rotating keys"
    },
    {
      title: "Role-Based Access Control",
      description: "Granular permissions based on user roles and departments",
      status: "Configured",
      icon: UserCheck,
      details: "15 custom roles, 47 permission levels"
    },
    {
      title: "Multi-Factor Authentication",
      description: "Required for all users with support for TOTP and hardware keys",
      status: "Enforced",
      icon: Key,
      details: "99.8% adoption rate across organization"
    },
    {
      title: "Audit Logging",
      description: "Comprehensive logging of all system access and data operations",
      status: "Monitoring",
      icon: Shield,
      details: "Real-time monitoring with 90-day retention"
    }
  ];

  const complianceStandards = [
    { name: "SOC 2 Type II", status: "Certified", validity: "Valid until Dec 2024" },
    { name: "ISO 27001", status: "Certified", validity: "Valid until Mar 2025" },
    { name: "GDPR Compliance", status: "Compliant", validity: "Continuously monitored" },
    { name: "HIPAA Ready", status: "Available", validity: "On-demand configuration" }
  ];

  const securityAlerts = [
    {
      level: "info",
      message: "Security patch applied successfully to all systems",
      timestamp: "2 hours ago",
      resolved: true
    },
    {
      level: "warning",
      message: "Unusual login pattern detected from IP 192.168.1.100",
      timestamp: "4 hours ago",
      resolved: false
    },
    {
      level: "success",
      message: "Monthly security audit completed with no issues",
      timestamp: "1 day ago",
      resolved: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Enforced':
      case 'Certified':
      case 'Compliant':
        return 'bg-success';
      case 'Configured':
      case 'Available':
        return 'bg-info';
      case 'Monitoring':
        return 'bg-warning';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'info': return <Shield className="w-4 h-4 text-info" />;
      default: return <Shield className="w-4 h-4 text-muted-foreground" />;
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
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">Enterprise Security</h1>
          </div>
        </div>

        {/* Security Score Overview */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-border/30">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary mb-2">{securityMetrics.overallScore}/100</div>
            <h2 className="text-xl font-semibold mb-2">Overall Security Score</h2>
            <p className="text-muted-foreground">Excellent security posture with industry-leading standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">{securityMetrics.encryption}%</div>
              <div className="text-sm text-muted-foreground mb-2">Encryption</div>
              <Progress value={securityMetrics.encryption} className="h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info mb-1">{securityMetrics.accessControl}%</div>
              <div className="text-sm text-muted-foreground mb-2">Access Control</div>
              <Progress value={securityMetrics.accessControl} className="h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">{securityMetrics.compliance}%</div>
              <div className="text-sm text-muted-foreground mb-2">Compliance</div>
              <Progress value={securityMetrics.compliance} className="h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">{securityMetrics.monitoring}%</div>
              <div className="text-sm text-muted-foreground mb-2">Monitoring</div>
              <Progress value={securityMetrics.monitoring} className="h-2" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Security Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Security Features
            </h2>
            
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.details}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(feature.status)}`} />
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {feature.description}
                </p>
                
                <Badge variant="outline">
                  {feature.status}
                </Badge>
              </Card>
            ))}
          </div>

          {/* Compliance & Alerts */}
          <div className="space-y-6">
            {/* Compliance Standards */}
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <UserCheck className="w-6 h-6 text-primary" />
                Compliance Standards
              </h2>
              
              <div className="space-y-4">
                {complianceStandards.map((standard, index) => (
                  <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{standard.name}</h3>
                      <Badge variant="secondary" className="text-success">
                        {standard.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {standard.validity}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Security Alerts */}
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Security Alerts
              </h2>
              
              <div className="space-y-4">
                {securityAlerts.map((alert, index) => (
                  <Card key={index} className="p-4 bg-card/80 backdrop-blur-sm border-border/30">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.level)}
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                      {alert.resolved && (
                        <Badge variant="secondary" className="text-success">
                          Resolved
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSecurity;