import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  description: string;
}

export const MetricCard = ({ title, value, change, trend, icon: Icon, description }: MetricCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-xs text-muted-foreground/80">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-foreground">
                {value}
              </h3>
              <span className={`text-sm flex items-center gap-1 px-2 py-1 rounded-full ${
                trend === 'up' 
                  ? 'text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-950' 
                  : 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950'
              }`}>
                {trend === 'up' ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {change}
              </span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};