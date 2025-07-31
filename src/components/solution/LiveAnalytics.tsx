import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Zap, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  BarChart3,
  Activity,
  Users,
  MessageCircle,
  Phone,
  Mail,
  RefreshCw
} from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

interface ChannelData {
  channel: string;
  icon: any;
  volume: number;
  responseTime: number;
  satisfaction: number;
  resolutionRate: number;
}

const LiveAnalytics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const metrics: Metric[] = [
    { label: 'Active Conversations', value: 247, change: '+12%', trend: 'up', color: 'text-blue-600' },
    { label: 'Avg Response Time', value: '0.8s', change: '-15%', trend: 'up', color: 'text-green-600' },
    { label: 'Resolution Rate', value: '96.8%', change: '+2.1%', trend: 'up', color: 'text-green-600' },
    { label: 'Customer Satisfaction', value: '4.9/5', change: '+0.2', trend: 'up', color: 'text-purple-600' },
    { label: 'Cost per Interaction', value: '€0.12', change: '-23%', trend: 'up', color: 'text-green-600' },
    { label: 'Escalation Rate', value: '3.2%', change: '-0.8%', trend: 'up', color: 'text-green-600' }
  ];

  const channelData: ChannelData[] = [
    { channel: 'Live Chat', icon: MessageCircle, volume: 1847, responseTime: 0.5, satisfaction: 4.9, resolutionRate: 98 },
    { channel: 'Voice Calls', icon: Phone, volume: 892, responseTime: 1.2, satisfaction: 4.8, resolutionRate: 95 },
    { channel: 'Email', icon: Mail, volume: 1203, responseTime: 2.3, satisfaction: 4.7, resolutionRate: 97 },
    { channel: 'Social Media', icon: Activity, volume: 456, responseTime: 1.8, satisfaction: 4.6, resolutionRate: 94 }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;
    return <div className="w-3 h-3 bg-gray-400 rounded-full" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-primary animate-pulse" size={20} />
              Live Platform Analytics
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live Data</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">{metric.label}</div>
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className="text-xs text-muted-foreground">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="text-primary" size={20} />
            Channel Performance Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {channelData.map((channel) => (
              <div key={channel.channel} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <channel.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{channel.channel}</span>
                    <Badge variant="outline">{channel.volume} interactions</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last 24 hours
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Response Time</div>
                    <div className="font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {channel.responseTime}s
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Satisfaction</div>
                    <div className="font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      {channel.satisfaction}/5
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Resolution Rate</div>
                    <div className="font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-blue-600" />
                      {channel.resolutionRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Performance</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${channel.resolutionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-primary" size={20} />
            Real-time Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[
              { time: '14:32:15', event: 'Healthcare inquiry resolved', channel: 'Chat', status: 'success' },
              { time: '14:32:03', event: 'E-commerce order tracked', channel: 'Voice', status: 'success' },
              { time: '14:31:47', event: 'SaaS API issue escalated', channel: 'Email', status: 'warning' },
              { time: '14:31:28', event: 'Insurance claim processed', channel: 'Chat', status: 'success' },
              { time: '14:31:12', event: 'Product return initiated', channel: 'Social', status: 'success' },
              { time: '14:30:58', event: 'Technical support completed', channel: 'Voice', status: 'success' },
              { time: '14:30:43', event: 'Appointment scheduled', channel: 'Chat', status: 'success' },
              { time: '14:30:29', event: 'Billing inquiry resolved', channel: 'Email', status: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm">{activity.event}</span>
                  <Badge variant="outline" className="text-xs">{activity.channel}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">12,847</div>
              <div className="text-sm text-muted-foreground">Interactions Today</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">€24,500</div>
              <div className="text-sm text-muted-foreground">Cost Savings (Monthly)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">847K</div>
              <div className="text-sm text-muted-foreground">Total Interactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveAnalytics;