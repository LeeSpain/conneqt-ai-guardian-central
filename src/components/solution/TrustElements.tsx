import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Clock, Globe, Award, MessageCircle } from 'lucide-react';

const TrustElements = () => {
  const certifications = [
    { name: 'SOC 2 Type II', icon: Shield, verified: true },
    { name: 'ISO 27001', icon: Award, verified: true },
    { name: 'HIPAA Compliant', icon: Shield, verified: true },
    { name: 'GDPR Ready', icon: Globe, verified: true }
  ];

  const stats = [
    { label: 'Enterprise Clients', value: '500+', icon: Users },
    { label: 'Uptime Guarantee', value: '99.9%', icon: Clock },
    { label: 'Languages Supported', value: '25+', icon: Globe },
    { label: 'Avg Response Time', value: '<2s', icon: MessageCircle }
  ];

  const teamMembers = [
    { 
      name: 'Sarah Chen', 
      role: 'Lead AI Engineer', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e38f?w=150&h=150&fit=crop&crop=face',
      experience: '8 years AI/ML'
    },
    { 
      name: 'Marcus Rodriguez', 
      role: 'Customer Success', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      experience: '5 years support'
    },
    { 
      name: 'Dr. Emily Watson', 
      role: 'Healthcare Specialist', 
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      experience: '12 years medical'
    },
    { 
      name: 'Alex Kumar', 
      role: 'Integration Expert', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experience: '6 years enterprise'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Live Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-primary" size={20} />
            Live Platform Statistics
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="text-primary" size={24} />
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="text-primary" size={20} />
            Security & Compliance Certifications
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <cert.icon className="text-green-600 mb-2" size={24} />
                <span className="text-sm font-medium text-center">{cert.name}</span>
                {cert.verified && (
                  <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="text-primary" size={20} />
            Meet Your Dedicated Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-3 w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-medium text-sm">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {member.experience}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Chat Widget Placeholder */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="text-primary" size={20} />
                Need Help? Chat with Our Experts
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Our team is online now to answer questions and provide demos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">3 agents online</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustElements;