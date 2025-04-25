
import { QuoteFormData } from '@/types/quote';

interface ContactInformationProps {
  formData: QuoteFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInformation = ({ formData, onChange }: ContactInformationProps) => (
  <div className="space-y-5">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-conneqt-slate mb-1">
        Full Name*
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      />
    </div>
    
    <div>
      <label htmlFor="company" className="block text-sm font-medium text-conneqt-slate mb-1">
        Company Name*
      </label>
      <input
        type="text"
        id="company"
        name="company"
        value={formData.company}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      />
    </div>
    
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-conneqt-slate mb-1">
        Email Address*
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      />
    </div>
    
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-conneqt-slate mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-conneqt-blue focus:ring-conneqt-blue focus:outline-none"
      />
    </div>
  </div>
);
