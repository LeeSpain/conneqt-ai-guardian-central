
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ClientHeaderProps = {
  subscriptionTier: 'starter' | 'professional' | 'enterprise';
  onSubscriptionChange: (tier: 'starter' | 'professional' | 'enterprise') => void;
};

export const ClientHeader = ({ subscriptionTier, onSubscriptionChange }: ClientHeaderProps) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Current Plan: <span className="font-medium text-conneqt-blue">
                {subscriptionTier === 'starter' && 'Starter'}
                {subscriptionTier === 'professional' && 'Professional'}
                {subscriptionTier === 'enterprise' && 'Enterprise'}
              </span>
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant={subscriptionTier === 'starter' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onSubscriptionChange('starter')}
            >
              Starter View
            </Button>
            <Button 
              variant={subscriptionTier === 'professional' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onSubscriptionChange('professional')}
            >
              Professional View
            </Button>
            <Button 
              variant={subscriptionTier === 'enterprise' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => onSubscriptionChange('enterprise')}
            >
              Enterprise View
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
