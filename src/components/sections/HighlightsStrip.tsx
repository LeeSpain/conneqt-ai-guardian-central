import { Headphones, Users, Smile, PiggyBank } from 'lucide-react';

const items = [
  {
    icon: <Users size={20} />,
    label: 'Clients served',
    value: '200+',
  },
  {
    icon: <Headphones size={20} />,
    label: 'Monthly interactions',
    value: '1M+',
  },
  {
    icon: <Smile size={20} />,
    label: 'Avg. CSAT',
    value: '4.8/5',
  },
  {
    icon: <PiggyBank size={20} />,
    label: 'Avg. savings',
    value: '35%',
  },
];

const HighlightsStrip = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((it) => (
            <div key={it.label} className="rounded-lg border bg-card p-4 flex items-center gap-3">
              <div className="shrink-0 text-conneqt-navy">{it.icon}</div>
              <div>
                <div className="text-xl font-semibold leading-none">{it.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{it.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsStrip;
